import { Request } from 'express'
import Error from '../models/error.model'

export const saveError = async (
  message: string,
  error: unknown,
  req: Request
) => {
  console.log(req.user)
  const user = req.user.id

  const newError = new Error({
    error,
    message,
    user
  })

  await newError.save()
}
