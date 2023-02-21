import axios from "axios"

const SERVER_URL = null

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
  })
}

// create a game
export const createGame = async (_selection, _selected, _decision) => {
  const param = JSON.stringify({
      selection: _selection,
      selected: _selected,
      decision: _decision,
  });

  console.log(param);

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
