import gameService from '../services/gameService.js'

// Valida se o id é um número inteiro positivo (MySQL usa id numérico)
const isValidId = (id) => /^\d+$/.test(id)

// Listando todos os games (com suas descriptions)
const getAllGames = async (req, res) => {
    try {
        const games = await gameService.getAll()
        res.status(200).json({ games }) //Código 200 (OK)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

// Cadastrando um Game (com description)
// Body esperado: { title, year, price, platform, genre, rating }
const createGame = async (req, res) => {
    try {
        const { title, year, price, platform, genre, rating } = req.body
        await gameService.Create(title, year, price, platform, genre, rating)
        res.sendStatus(201) //Código 201 (CREATED)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

// Deletando um Game (description removida via CASCADE)
const deleteGame = async (req, res) => {
    try {
        if (isValidId(req.params.id)) {
            const id = req.params.id
            await gameService.Delete(id)
            res.sendStatus(204) // Código 204 (NO CONTENT)
        } else {
            res.sendStatus(400) // Código 400 (BAD REQUEST)
        }
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

// Alterando um Game e sua description
// Body esperado: { title, year, price, platform, genre, rating }
const updateGame = async (req, res) => {
    try {
        if (isValidId(req.params.id)) {
            const id = req.params.id
            const { title, year, price, platform, genre, rating } = req.body
            const game = await gameService.Update(id, title, year, price, platform, genre, rating)
            res.status(200).json({ game }) //Código 200 (OK)
        } else {
            res.sendStatus(400) //Código 400 (BAD REQUEST)
        }
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

// Listando um único Game (com sua description)
const getOneGame = async (req, res) => {
    try {
        if (isValidId(req.params.id)) {
            const id = req.params.id
            const game = await gameService.getOne(id)
            if (!game) {
                res.sendStatus(404) // Jogo não encontrado
            } else {
                res.status(200).json({ game })
            }
        } else {
            res.sendStatus(400) // Requisição inválida
        }
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

export default { getAllGames, createGame, deleteGame, updateGame, getOneGame }