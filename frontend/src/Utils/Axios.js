import axios from "axios"

const SERVER_URL = null

const instance = axios.create({ baseURL: SERVER_URL || 'http://127.0.0.1:8000' })
const jsonHeader = {
  headers: {
    'Content-Type': 'application/json'
  }
}

// calculate a game
export const calculateGame = async (id, selection) => {
  return await instance.put(`/calculate_game/${id}`, selection, jsonHeader).then((res) => {
    return res.data;
  })
}