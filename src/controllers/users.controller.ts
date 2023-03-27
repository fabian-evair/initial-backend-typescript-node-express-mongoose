import { Request, Response } from 'express'
import handleHttp from '../utils/error.handle'
import {
  createNewUser,
  findUserById,
  findUsers,
  deleteUserByID,
  updateUserById
} from '../services/users.service'
import { saveError } from '../services/error.service'

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await findUsers()

    if (!users) throw new Error('No se han encontrado usuarios')
    return res.json({ ok: true, data: users })
  } catch (error) {
    if (error instanceof Error) {
      handleHttp(res, 'ERROR_GET_USERS', error.message)
    } else {
      await saveError('Unexpected error', error, req)
      return res
        .status(500)
        .send({
          error: 'Unexpected error',
          message: 'Ha ocurrido un error en el servidor'
        })
    }
  }
}

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await findUserById(req.params.userId)

    if (!user) throw new Error('Usuario no encontrado')

    return res.json({ ok: true, data: user })
  } catch (error) {
    if (error instanceof Error) {
      handleHttp(res, 'ERROR_GET_USER', error.message)
    } else {
      await saveError('Unexpected error', error, req)
      return res
        .status(500)
        .send({
          error: 'Unexpected error',
          message: 'Ha ocurrido un error en el servidor'
        })
    }
  }
}

export const postUser = async (req: Request, res: Response) => {
  try {
    const { body } = req
    const user = await createNewUser(body)

    if (!user) throw new Error('El usuario ya se encuentra registrado')

    res.send(user)
  } catch (error) {
    if (error instanceof Error) {
      handleHttp(res, 'ERROR_POST_USER', error.message)
    } else {
      await saveError('Unexpected error', error, req)
      return res
        .status(500)
        .send({
          error: 'Unexpected error',
          message: 'Ha ocurrido un error en el servidor'
        })
    }
  }
}

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const user = req.body
    const updatedUser = await updateUserById(userId, user)
    res.send(updatedUser)
  } catch (error) {
    if (error instanceof Error) {
      handleHttp(res, 'ERROR_UPDATE_USER', error.message)
    } else {
      await saveError('Unexpected error', error, req)
      return res
        .status(500)
        .send({
          error: 'Unexpected error',
          message: 'Ha ocurrido un error en el servidor'
        })
    }
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await deleteUserByID(req.params.userId)

    if (!user) throw new Error('Usuario no encontrado')

    res.json({ ok: true, data: user })
  } catch (error) {
    if (error instanceof Error) {
      handleHttp(res, 'ERROR_DELETE_USER', error.message)
    } else {
      await saveError('Unexpected error', error, req)
      return res
        .status(500)
        .send({
          error: 'Unexpected error',
          message: 'Ha ocurrido un error en el servidor'
        })
    }
  }
}
