import * as mongoose from 'mongoose'

export const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    bio: { type: String, required: true },
    nickname: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
  },
  { timestamps: true },
)

export interface User extends mongoose.Document {
  id: string
  name: string
  bio: string
  nickname: string
  email: string
  password: string
}
