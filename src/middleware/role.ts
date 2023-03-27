import { NextFunction, Request } from 'express'
import User from '../models/user.model'

export const validationRole = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = User.findById(req.user)
  console.log(user)
}
