import express from 'express'
import dotenv from 'dotenv'
import conn from '../config/sequelize'
import UserRoutes from './routes/UserRoute'
dotenv.config()

const app = express()
app.use(express.json())

app.use('/users', UserRoutes)

conn.sync().then(() => app.listen(process.env.PORT || 5050))
