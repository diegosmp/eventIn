import express from 'express'
import GuestsController from '../controllers/GuestsController'
import authUser from '../middlewares/authUser'

const router = express.Router()

router.use(authUser)
router.get('/all/guests')
router.post('/create/:userId', GuestsController.createGuests)
router.patch('/:guestId/edit/:userId', GuestsController.createGuests)
router.delete('/:guestId/delete/:userId', GuestsController.createGuests)

export default router
