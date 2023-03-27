import { Response } from 'express'
import User from '../models/user.model'
import { IUser } from '../interface/user.interface'
import { encrypt, verified } from '../utils/bcrypt.handle'
import { generateToken, generateRefreshToken } from '../utils/jwt.handle'

export const registerNewUser = async (authUser: IUser) => {
  const { rut, password, names, lastNames } = authUser
  const checkIs = await User.findOne({ rut })

  if (checkIs) return 'ALREADY_USER'

  const hashPassword = await encrypt(password)

  const user = new User({
    names,
    lastNames,
    rut,
    password: hashPassword
  })

  const registerNewUser = await user.save()

  return registerNewUser
}

export const loginUser = async ({ rut, password }: IUser, res: Response) => {
  const checkIs = await User.findOne({ rut })
  if (!checkIs) return 'INCORRECT_CREDENTIALS'

  const hashPassword = checkIs.password
  const isCorrect = await verified(password, hashPassword)

  if (!isCorrect) return 'INCORRECT_CREDENTIALS'

  const { token, expiresIn } = generateToken(checkIs.id)

  generateRefreshToken(checkIs.id, res)

  const data = {
    token,
    expiresIn,
    user: checkIs
  }

  return data
}

export const refreshUserToken = async (id: string) => {
  const user = await User.findOne({ _id: id })

  if (!user) return 'INCORRECT_CREDENTIALS'

  const { token, expiresIn } = generateToken(id)

  const data = {
    token,
    expiresIn,
    user
  }

  return data
}
