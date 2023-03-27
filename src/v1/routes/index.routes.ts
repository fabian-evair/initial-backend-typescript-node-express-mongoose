import { Router } from 'express'

const router: Router = Router()

import usersRoutes from './api/users.routes'
import authRoutes from './api/auth.routes'

router.use('/users', usersRoutes)
router.use('/auth', authRoutes)

export default router
