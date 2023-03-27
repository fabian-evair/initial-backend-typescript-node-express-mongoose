import { IRole } from './role.interface'
import { Document } from 'mongoose'

export interface IUser extends Document {
  names: string
  lastNames: string
  rut: string
  password: string
  birthday?: Date
  address?: string
  emergencyNumber?: string
  registration?: Date
  isForean?: boolean
  active: Boolean
  roles?: Array<IRole['id']>
}
