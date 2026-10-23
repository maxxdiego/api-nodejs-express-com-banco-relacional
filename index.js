import express from 'express'
const app = express()
import mysql from 'mysql2/promise'
import sequelize from './config/database.js'
import cors from 'cors'
import 'dotenv/config'

// Importa as associações para que o Sequelize conheça os relacionamentos antes do sync()
import './models/associations.js'

import gameRoutes from './routes/gameRoutes.js'
import userRoutes from './routes/userRoutes.js'

// Configurações do Express
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())
app.use('/', gameRoutes)
app.use('/', userRoutes)

// Função que cria o banco de dados caso não exista e então inicia a API
const startServer = async () => {
    try {
        // 1. Conecta ao MySQL SEM especificar o banco para poder criá-lo
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
        })

        const dbName = process.env.DB_NAME
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`)
        console.log(`Banco de dados "${dbName}" verificado/criado com sucesso.`)
        await connection.end()

        // 2. Autentica a conexão do Sequelize
        await sequelize.authenticate()
        console.log('Conexão com MySQL estabelecida com sucesso.')

        // 3. Cria/sincroniza todas as tabelas (games, descriptions, users)
        await sequelize.sync()
        console.log('Tabelas sincronizadas com sucesso.')

        // 4. Inicia o servidor Express
        const port = process.env.PORT || 4000
        app.listen(port, (error) => {
            if(error) {
                console.log(error)
            }
            console.log(`API rodando em http://localhost:${port}.`)
        })

    } catch (error) {
        console.error('Erro ao iniciar o servidor:', error)
    }
}

startServer()