import { Router } from 'express'
import {
  login,
  logout,
  refreshToken,
  register
} from '../../../controllers/auth.controller'
import { refreshUserToken } from '../../../middleware/refreshUserToken'

const router: Router = Router()

router.post('/register', register)
router.post('/login', login)

router.get('/refresh', refreshUserToken, refreshToken)
router.get('/logout', logout)

export default router
