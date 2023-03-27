import { Schema, model } from 'mongoose'
import { IError } from '../interface/error.interface'

const errorSchema = new Schema<IError>({
  error: {
    type: String
  },
  message: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

errorSchema.method('JSON', function () {
  const { _v, _id, ...object } = this.Object()
  object.id = _id
  return object
})

export default model('Error', errorSchema)
