import express from 'express'
import UserController from '../controllers/UserController'
import authUser from '../middlewares/authUser'

const router = express.Router()

router.post('/signup', UserController.createUser)
router.get('/signin', UserController.loginUser)
router.use(authUser)
router.patch('/profile/:userId/edit', UserController.editUser)
router.patch('/profile/:userId/reset/password', UserController.userResetPass)
router.delete('/profile/:userId/delete', UserController.userDelete)

export default router
