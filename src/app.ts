import express from 'express'
import dotenv from 'dotenv'
import conn from '../config/sequelize'

dotenv.config()

const app = express()

conn.sync().then(() => app.listen(process.env.PORT || 5050))
