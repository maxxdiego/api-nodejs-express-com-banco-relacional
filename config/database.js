import { Sequelize } from 'sequelize'
import 'dotenv/config'

// Configuração da conexão com o MySQL via Sequelize
const sequelize = new Sequelize(
    process.env.DB_NAME,   // nome do banco de dados
    process.env.DB_USER,   // usuário do banco
    process.env.DB_PASS,   // senha do banco
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mysql',
        logging: false, // desativa logs SQL no console (mude para console.log para depurar)
    }
)

export default sequelize
