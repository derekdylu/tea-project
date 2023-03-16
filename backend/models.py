from bson import ObjectId
from pydantic import BaseModel, Field
from typing import Dict, List, Optional
from sympy import true

class PyObjectId(ObjectId):
  @classmethod
  def __get_validators__(cls):
    yield cls.validate

  @classmethod
  def validate(cls, v):
    if not ObjectId.is_valid(v):
      raise ValueError("Invalid objectid")
    return ObjectId(v)

  @classmethod
  def __modify_schema__(cls, field_schema):
    field_schema.update(type="string")

class Game(BaseModel):
  id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
  selection: list = Field(...)
  selected: list = Field(...)
  decision: int = Field(...)
  timestamp: str = Field(...)
  shown: bool = Field(...)

  class Config:
    allow_population_by_field_name = True
    arbitrary_types_allowed = True
    json_encoders = {ObjectId: str}
    schema_extra = {
      "example": {
        "selection": [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        "selected": [0,1,2,3],
        "decision": 3,
        "timestamp": '"1234567890',
        "shown": False,
      }
    }

class UpdateGame(BaseModel):
  selection: Optional[list]
  selected: Optional[list]
  decision: Optional[int]
  timestamp: Optional[str]
  shown: Optional[bool]

  class Config:
    arbitrary_types_allowed = True
    json_encoders = {ObjectId: str}
    schema_extra = {
      "example": {
        "selection": [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        "selected": [0,1,2,3],
        "decision": 3,
        "timestamp": '"1234567890',
        "shown": False,
      }
    }

def game_helper(game) -> dict:
  return {
    "id": game["_id"],
    "selection": game["selection"],
    "selected": game["selected"],
    "decision": game["decision"],
    "timestamp": game["timestamp"],
    "shown": game["shown"],
  }