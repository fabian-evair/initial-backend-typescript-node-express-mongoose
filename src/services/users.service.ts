import User from '../models/user.model'
import { IUser } from '../interface/user.interface'
import { encrypt } from '../utils/bcrypt.handle'
import Roles from '../models/role.models'

export const findUsers = async () => {
  const users = await User.find()
  return users
}

export const findUserById = async (userID: string) => {
  const user = await User.findById(userID)
  return user
}

export const createNewUser = async (user: IUser) => {
  const { rut, roles } = user

  const checkUser = await User.findOne({ rut })

  if (checkUser) return null

  if (user.password) {
    const hashPassword = await encrypt(user.password)
    user.password = hashPassword
  }
  console.log(roles)

  if (!roles) {
    const role = await Roles.findOne({ slug: 'player' })
    user.roles = [role?.id]
  }

  const newUser = new User(user)

  console.log(newUser)
  await newUser.save()
  return newUser
}

export const updateUserById = async (userId: string, data: IUser) => {
  const updatedUser = await User.findOneAndUpdate({ _id: userId }, data, {
    new: true
  })
  return updatedUser
}

export const deleteUserByID = async (userId: string) => {
  const user = await User.findByIdAndDelete({ _id: userId })
  return user
}
