import { Request, Response } from 'express'
import {
  registerNewUser,
  loginUser,
  refreshUserToken
} from '../services/auth.service'

export const register = async (req: Request, res: Response) => {
  const responseUser = await registerNewUser(req.body)
  res.send(responseUser)
}

export const login = async (req: Request, res: Response) => {
  const responseUser = await loginUser(req.body, res)
  res.send(responseUser)
}

export const logout = async (_req: Request, res: Response) => {
  res.clearCookie('refreshToken')
  res.json({ ok: true })
}

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const responseUser = await refreshUserToken(req.user.id)
    return res.send(responseUser)
  } catch (error) {
    return res.status(500).json({ error: 'error de server' })
  }
}
