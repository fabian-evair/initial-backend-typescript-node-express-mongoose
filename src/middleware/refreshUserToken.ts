import { NextFunction, Request, Response } from 'express'
import {
  tokenVerificationErrors,
  verifyRefreshToken
} from '../utils/jwt.handle'

export const refreshUserToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const jwt = await req.cookies.refreshToken
    if (!jwt) throw new Error('No existe el token')

    const id = verifyRefreshToken(jwt)
    req.user = id
    next()
  } catch (error) {
    if (error instanceof Error) {
      return res
        .status(401)
        .send({ error: tokenVerificationErrors[error.message] })
    } else {
      return res.status(401).send({ error: 'Unexpected error' })
    }
  }
}
