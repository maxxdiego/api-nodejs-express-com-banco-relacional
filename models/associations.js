import Game from './Games.js'
import Description from './Descriptions.js'

// Um Game possui uma Description (1:1)
Game.hasOne(Description, {
    foreignKey: 'game_id',  // coluna criada na tabela descriptions
    onDelete: 'CASCADE',    // ao deletar um game, sua description é deletada também
})

// Uma Description pertence a um Game
Description.belongsTo(Game, {
    foreignKey: 'game_id',
})

export { Game, Description }
