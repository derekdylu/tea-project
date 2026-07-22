from bson import ObjectId
from pydantic import BaseModel, ConfigDict, Field, StringConstraints
from typing import Annotated, List, Optional

Decision = Annotated[int, Field(ge=-1, le=16)]
SelectionValue = Annotated[int, Field(ge=0, le=1)]
GameSelection = Annotated[List[SelectionValue], Field(min_length=31, max_length=31)]
StoredSelection = Annotated[List[SelectionValue], Field(max_length=31)]
SelectedTeas = Annotated[List[Annotated[int, Field(ge=0, le=16)]], Field(max_length=17)]
Timestamp = Annotated[str, StringConstraints(pattern=r"^[0-9]{1,13}$")]

class Game(BaseModel):
  id: str = Field(default_factory=lambda: str(ObjectId()), alias="_id", pattern=r"^[0-9a-f]{24}$")
  selection: StoredSelection = Field(...)
  selected: SelectedTeas = Field(...)
  decision: Decision = Field(...)
  timestamp: Timestamp = Field(...)
  shown: bool = Field(...)

  model_config = ConfigDict(
    populate_by_name=True,
    coerce_numbers_to_str=True,
    extra="forbid",
    json_schema_extra={
      "example": {
        "selection": [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        "selected": [0,1,2,3],
        "decision": 3,
        "timestamp": 1234567890,
        "shown": False,
      }
    },
  )

class UpdateGame(BaseModel):
  selection: Optional[StoredSelection] = None
  selected: Optional[SelectedTeas] = None
  decision: Optional[Decision] = None
  timestamp: Optional[Timestamp] = None
  shown: Optional[bool] = None

  model_config = ConfigDict(
    extra="forbid",
    coerce_numbers_to_str=True,
    json_schema_extra={
      "example": {
        "selection": [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        "selected": [0,1,2,3],
        "decision": 3,
        "timestamp": 1234567890,
        "shown": False,
      }
    },
  )

def game_helper(game) -> dict:
  return {
    "id": str(game["_id"]),
    "selection": game["selection"],
    "selected": game["selected"],
    "decision": game["decision"],
    "timestamp": game["timestamp"],
    "shown": game["shown"],
  }
