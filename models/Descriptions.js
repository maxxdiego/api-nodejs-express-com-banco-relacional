import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

// Modelo Description: abriga as descrições dos jogos
const Description = sequelize.define('Description', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    platform: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rating: {
        type: DataTypes.STRING, // Ex: "Livre", "12+", "14+", "16+", "18+"
        allowNull: false,
    },
    // game_id será adicionado automaticamente pelo Sequelize via associação (belongsTo)
}, {
    tableName: 'descriptions',
    timestamps: false,
})

export default Description
