import axios from "axios"
// import "dotenv/config"

// const SERVER_URL = process.env.SERVER_URL;
const instance = axios.create({ baseURL: 'http://127.0.0.1:8000' });
const jsonHeader = {
    headers: {
    'Content-Type': 'application/json'
    }
};

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