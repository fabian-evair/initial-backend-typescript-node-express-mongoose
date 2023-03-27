import { IUser } from '../interface/user.interface'
import { Schema, model } from 'mongoose'

const userSchema = new Schema<IUser>(
  {
    names: {
      type: String,
      required: true
    },
    lastNames: {
      type: String,
      required: true
    },
    rut: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String
    },
    birthday: {
      type: Date
    },
    address: {
      type: String
    },
    emergencyNumber: {
      type: String
    },
    registration: {
      type: Date
    },
    isForean: {
      type: Boolean
    },
    active: {
      type: Boolean,
      default: true
    },
    roles: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Role'
      }
    ]
  },

  {
    timestamps: true,
    versionKey: false
  }
)

userSchema.method('toJSON', function () {
  const { __v, _id, password, ...object } = this.toObject()
  object.id = _id
  return object
})

export default model('Users', userSchema)
