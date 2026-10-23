import express from 'express'
const gameRoutes = express.Router()
import gameController from '../controllers/gameController.js'
import Auth from '../middleware/Auth.js'

// Endpoint para listar todos os Games
gameRoutes.get("/games", Auth.Authorization, gameController.getAllGames) 

// Endpoint para cadastrar um Game
gameRoutes.post("/games", Auth.Authorization, gameController.createGame) 

// Endpoint para deletar um Game
gameRoutes.delete("/games/:id", Auth.Authorization, gameController.deleteGame) 

// Endpoint para alterar um Game
gameRoutes.put("/games/:id", Auth.Authorization, gameController.updateGame) 

// Endpoint para listar um único Game
gameRoutes.get("/games/:id", Auth.Authorization, gameController.getOneGame) 

export default gameRoutes