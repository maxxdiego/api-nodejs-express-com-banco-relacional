import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

// Definindo o modelo User para o MySQL com Sequelize
const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'users',
    timestamps: false, // desativa as colunas createdAt e updatedAt
})

export default User