import { NextFunction, Request, Response } from 'express'
import { verifyToken, tokenVerificationErrors } from '../utils/jwt.handle'

export const validationToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const jwtByUser = req.headers.authorization || ''
    const jwt = jwtByUser.split(' ').pop()
    const isUser = verifyToken(`${jwt}`)

    if (!isUser) throw new Error('NO BEARER')

    // se envia la info del usuario para ser ocupada en los controladores
    req.user = isUser
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
