import os
import uvicorn
import motor.motor_asyncio
from dotenv import load_dotenv
from fastapi import FastAPI, Body, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse, HTMLResponse
from typing import List
from pymongo import MongoClient
from decouple import config

from . import calculate
from . import models

# import calculate
# import models

if __name__ == "__main__":
  uvicorn.run("app", host="0.0.0.0", port=8000, reload=True)

load_dotenv()

app = FastAPI()

origins = [
  "http://localhost",
  "http://localhost:3000",
]

app.add_middleware(
  CORSMiddleware,
  allow_origins=origins,
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

MONGO_URI = os.environ.get("MONGO_URI")
PORT = os.environ.get("PORT")

client = MongoClient(MONGO_URI, int(PORT))

database = client["db"]
game_col = database["game"]

def ResponseModel(data, message="success"):
  return {
    "data": [data],
    "code": 200,
    "message": message,
  }

def ErrorResponseModel(error, code, message):
  return {"error": error, "code": code, "message": message}

# --- API --------------------------------

@app.get("/")
async def test():
  return {"server": "OK"}

# --- Game
# get all games
@app.get("/games", response_description="get all games", response_model=List[models.Game])
async def list_games():
  list = []

  for ele in game_col.find():
    list.append(models.game_helper(ele))

  return list

# get a game
@app.get("/game/{id}", response_description="get a game", response_model=models.Game)
async def get_game(id: str):
  if (game := game_col.find_one({"_id": id})) is not None:
    return game
  raise HTTPException(status_code=404, detail=f"Game {id} not found")

# create a game
@app.post("/create_game", response_description="create a game", response_model=models.Game)
async def create_game(game: models.Game = Body(...)):
  game = jsonable_encoder(game)
  new_game = game_col.insert_one(game)
  created_game = game_col.find_one({"_id": new_game.inserted_id})
  return JSONResponse(status_code=status.HTTP_201_CREATED, content=jsonable_encoder(models.game_helper(created_game)))

# delete a game
@app.delete("/delete_game/{id}", response_description="delete a game")
async def delete_student(id: str):
  delete_result = game_col.delete_one({"_id": id})

  if delete_result.deleted_count == 1:
    return status.HTTP_204_NO_CONTENT

# update a game
@app.put("/update_game/{id}", response_description="update a game", response_model=models.Game)
async def update_game(id: str, game: models.UpdateGame = Body(...)):
  game = {k: v for k, v in game.dict().items() if v is not None}

  if len(game) >= 1:
    update_result = game_col.update_one({"_id": id}, {"$set": game})

    if update_result.modified_count == 1:
      if (
        updated_game := game_col.find_one({"_id": id})
      ) is not None:
        return JSONResponse(status_code=status.HTTP_200_OK, content=jsonable_encoder(models.game_helper(updated_game)))

  if (existing_game := game_col.find_one({"_id": id})) is not None:
    return JSONResponse(status_code=status.HTTP_200_OK, content=jsonable_encoder(models.game_helper(existing_game)))

  raise HTTPException(status_code=404, detail=f"Game {id} not found")

# calculate a game
@app.put("/calculate_game/{id}", response_description="calculate a game", response_model=models.Game)
async def calculate_game(id: str, selection: list):
  selected = calculate.similarity(selection)

  update_result = game_col.update_one({"_id": id}, {"$set": { "selected": selected }})
  
  if update_result.modified_count == 1:
    if (
      updated_game := game_col.find_one({"_id": id})
    ) is not None:
      return JSONResponse(status_code=status.HTTP_200_OK, content=jsonable_encoder(models.game_helper(updated_game)))
  
  if (existing_game := game_col.find_one({"_id": id})) is not None:
    return JSONResponse(status_code=status.HTTP_200_OK, content=jsonable_encoder(models.game_helper(existing_game)))

  raise HTTPException(status_code=404, detail=f"Game {id} not found")