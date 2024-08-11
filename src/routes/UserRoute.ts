import express from 'express'
import UserController from '../controllers/UserController'

const router = express.Router()

router.post('/signup', UserController.createUser)
router.patch('/profile/:userId/edit', UserController.editUser)
router.delete('/profile/:userId/delete', UserController.userDelete)

export default router
