import { IPayload } from '../interface/auth.interface'
import { Response } from 'express'
import { sign, verify } from 'jsonwebtoken'
const JWT_SECRET = process.env.JWT_SECRET || 'secretdev'
const JWT_REFRESH = process.env.JWT_REFRESH || 'refreshdev'

export const generateToken = (id: string) => {
  const expiresIn = 60 * 60 * 24 * 30
  const token = sign({ id }, JWT_SECRET, { expiresIn })
  return { token, expiresIn }
}

export const verifyToken = (jwt: string) => {
  const { id } = verify(jwt, JWT_SECRET) as IPayload
  return id
}

export const verifyRefreshToken = (jwt: string) => {
  const { id } = verify(jwt, JWT_REFRESH) as IPayload
  return { id }
}

export const generateRefreshToken = (id: string, res: Response) => {
  const expiresIn = 60 * 60 * 24 * 30
  try {
    const refreshToken = sign({ id }, JWT_REFRESH, {
      expiresIn
    })

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: !(process.env.MODO === 'developer'),
      expires: new Date(Date.now() + expiresIn * 1000),
      sameSite: 'none'
    })
  } catch (error) {
    console.log(error)
  }
}

export const tokenVerificationErrors: Record<string, string> = {
  'invalid signature': 'La firma del JWT no es válida',
  'jwt expired': 'JWT expirado',
  'invalid token': 'Token no válido',
  'No Bearer': 'Utiliza formato Bearer',
  'jwt malformed': 'JWT formato no válido'
}
