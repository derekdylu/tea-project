import axios from "axios"

const SERVER_URL = "https://ntu-tea-project.herokuapp.com/"

const instance = axios.create({ baseURL: SERVER_URL || 'http://127.0.0.1:8000' })
const jsonHeader = {
  headers: {
    'Content-Type': 'application/json'
  }
}

// --- Game
// get all games
export const getGames = async () => {
  return await instance.get('/games').then((res) => {
      return res.data;
  });
}

// create a game
export const createGame = async (_selection, _selected, _decision, _timestamp, _shown) => {
  const param = JSON.stringify({
      selection: _selection,
      selected: _selected,
      decision: _decision,
      timestamp: _timestamp,
      shown: _shown,
  });

  return await instance.post('/create_game', param, jsonHeader).then((res) => {
      return res.data;
  })
}

// calculate a game
export const calculateGame = async (id, selection) => {
  return await instance.put(`/calculate_game/${id}`, selection, jsonHeader).then((res) => {
    return res.data;
  })
}

export const updateGame = async (id, _selection, _selected, _decision, _timestamp, _shown) => {
  let param = {}
  
  if (_selection != null) {
    param = {...param, "selection": _selection}
  }
  
  if (_selected != null) {
    param = {...param, "selected": _selected}
  }
  
  if (_decision != null) {
    param = {...param, "decision": _decision}
  }
  
  if (_timestamp != null) {
    param = {...param, "timestamp": _timestamp}
  }
  
  if (_shown != null) {
    param = {...param, "shown": _shown}
  }

  param = JSON.stringify(param);
  return instance.put(`/update_game/${id}`, param, jsonHeader).then((res) => {
    return res.data;
  })
}