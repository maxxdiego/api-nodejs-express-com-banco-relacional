import { Game, Description } from '../models/associations.js'

class gameService {

    // Retorna todos os games com suas descriptions
    async getAll() {
        try {
            const games = await Game.findAll({
                include: [{ model: Description }]
            })
            return games
        } catch (error) {
            console.log(error)
        }
    }

    // Cria um game e sua description associada
    async Create(title, year, price, platform, genre, rating) {
        try {
            const newGame = await Game.create({ title, year, price })
            await Description.create({
                platform,
                genre,
                rating,
                game_id: newGame.id
            })
        } catch (error) {
            console.log(error)
        }
    }

    // Deleta um game (a description é removida automaticamente via CASCADE)
    async Delete(id) {
        try {
            await Game.destroy({ where: { id } })
            console.log(`Game com a id: ${id} foi deletado.`)
        } catch (error) {
            console.log(error)
        }
    }

    // Atualiza os dados do game e de sua description
    async Update(id, title, year, price, platform, genre, rating) {
        try {
            await Game.update(
                { title, year, price },
                { where: { id } }
            )
            await Description.update(
                { platform, genre, rating },
                { where: { game_id: id } }
            )
            const updatedGame = await Game.findByPk(id, {
                include: [{ model: Description }]
            })
            console.log(`Dados do game com id: ${id} alterados com sucesso.`)
            return updatedGame
        } catch (error) {
            console.log(error)
        }
    }

    // Retorna um único game com sua description
    async getOne(id) {
        try {
            const game = await Game.findByPk(id, {
                include: [{ model: Description }]
            })
            return game
        } catch (error) {
            console.log(error)
        }
    }
}

export default new gameService()