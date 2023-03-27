import { Router } from 'express'
import {
  postUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser
} from '../../../controllers/users.controller'
import { validationToken } from '../../../middleware/session'

const router = Router()

router.get('/', validationToken, getAllUsers)
router.get('/:userId', validationToken, getUser)
router.post('/', validationToken, postUser)
router.put('/:userId', validationToken, updateUser)
router.delete('/:userId', validationToken, deleteUser)

export default router
