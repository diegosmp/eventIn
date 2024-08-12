import express from 'express'
import dotenv from 'dotenv'
import conn from '../config/sequelize'
import UserRoutes from './routes/UserRoute'
import GuestsRoute from './routes/GuestsRoute'
dotenv.config()

const app = express()
app.use(express.json())

app.use('/users', UserRoutes)
app.use('/guests', GuestsRoute)

conn.sync().then(() => app.listen(process.env.PORT || 5050))
