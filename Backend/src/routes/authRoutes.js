import { Router } from 'express'
import { currentUser, login, logout, register } from '../controllers/authController.js'
import { authenticate } from '../middleware/authenticate.js'
import { validateRequest } from '../middleware/validateRequest.js'
import { loginValidator, registerValidator } from '../validators/authValidators.js'

const router = Router()

router.post('/register', registerValidator, validateRequest, register)
router.post('/login', loginValidator, validateRequest, login)
router.get('/me', authenticate, currentUser)
router.post('/logout', logout)

export default router
