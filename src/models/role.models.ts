import { Schema, model } from 'mongoose'
import { IRole } from '../interface/role.interface'

export enum Role {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  DIRECTIVE = 'directive',
  PLAYER = 'player',
  DT = 'dt'
}

const roleSchema = new Schema<IRole>(
  {
    name: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      enum: Role,
      required: true,
      unique: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

export default model('Role', roleSchema)

roleSchema.method('JSON', function () {
  const { _v, _id, ...object } = this.Object()
  object.id = _id
  return object
})
