import { IUser } from './user.interface'

export interface IError {
  error: string
  message: string
  user: IUser['id']
}
