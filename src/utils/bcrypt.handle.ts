import { hash, compare, genSalt } from 'bcryptjs'

export const encrypt = async (password: string) => {
  const salt = await genSalt(10)
  const passwordHash = await hash(password, salt)
  return passwordHash
}

export const verified = async (password: string, hasshPassword: string) => {
  const isCorrect = await compare(password, hasshPassword)
  return isCorrect
}
