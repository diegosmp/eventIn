import express from 'express'
import GuestsController from '../controllers/GuestsController'

const router = express.Router()

router.post('/create/:userId', GuestsController.createGuests)

export default router
