import os
from typing import List

from fastapi import Body, FastAPI, HTTPException, Query, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.encoders import jsonable_encoder
from pymongo import DESCENDING, MongoClient

from . import calculate
from . import models

app = FastAPI()

default_origins = [
  "http://localhost",
  "http://localhost:5173",
  "https://ntu-tea-tinder.netlify.app",
]
configured_origins = os.environ.get("CORS_ORIGINS", "")
origins = [origin.strip() for origin in configured_origins.split(",") if origin.strip()]
if not origins:
  origins = default_origins

app.add_middleware(
  CORSMiddleware,
  allow_origins=origins,
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

MONGO_URI = os.environ.get("MONGO_URI")
client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5_000) if MONGO_URI else None
game_col = client["db"]["game"] if client is not None else None


def get_game_collection():
  if game_col is None:
    raise HTTPException(status_code=503, detail="Database is not configured")
  return game_col

# --- API --------------------------------

@app.get("/")
def health():
  return {"status": "ok", "database_configured": game_col is not None}

# --- Game
# get all games
@app.get("/games", response_description="get all games", response_model=List[models.Game])
def list_games(limit: int = Query(default=1_000, ge=1, le=5_000)):
  collection = get_game_collection()
  games = []

  for game in collection.find().sort("timestamp", DESCENDING).limit(limit):
    games.append(models.game_helper(game))

  return games

# get a game
@app.get("/game/{id}", response_description="get a game", response_model=models.Game)
def get_game(id: str):
  collection = get_game_collection()
  if (game := collection.find_one({"_id": id})) is not None:
    return models.game_helper(game)
  raise HTTPException(status_code=404, detail=f"Game {id} not found")

# create a game
@app.post("/create_game", response_description="create a game", response_model=models.Game, status_code=status.HTTP_201_CREATED)
def create_game(game: models.Game = Body(...)):
  collection = get_game_collection()
  game = jsonable_encoder(game)
  new_game = collection.insert_one(game)
  created_game = collection.find_one({"_id": new_game.inserted_id})
  return models.game_helper(created_game)

# update a game
@app.put("/update_game/{id}", response_description="update a game", response_model=models.Game)
def update_game(id: str, game: models.UpdateGame = Body(...)):
  collection = get_game_collection()
  game = game.model_dump(exclude_none=True)

  if len(game) >= 1:
    update_result = collection.update_one({"_id": id}, {"$set": game})

    if update_result.modified_count == 1:
      if (
        updated_game := collection.find_one({"_id": id})
      ) is not None:
        return models.game_helper(updated_game)

  if (existing_game := collection.find_one({"_id": id})) is not None:
    return models.game_helper(existing_game)

  raise HTTPException(status_code=404, detail=f"Game {id} not found")

# calculate a game
@app.put("/calculate_game/{id}", response_description="calculate a game", response_model=models.Game)
def calculate_game(id: str, selection: models.GameSelection = Body(...)):
  collection = get_game_collection()
  selected = calculate.similarity(selection)

  update_result = collection.update_one({"_id": id}, {"$set": { "selection": selection, "selected": selected, "decision": selected[0] }})

  if update_result.modified_count == 1:
    if (
      updated_game := collection.find_one({"_id": id})
    ) is not None:
      return models.game_helper(updated_game)

  if (existing_game := collection.find_one({"_id": id})) is not None:
    return models.game_helper(existing_game)

  raise HTTPException(status_code=404, detail=f"Game {id} not found")
