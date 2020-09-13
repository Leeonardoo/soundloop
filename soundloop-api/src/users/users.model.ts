import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  bio: string

  @Prop({ required: true, unique: true })
  username: string

  @Prop({ required: true, unique: true })
  email: string

  @Prop({ required: true, select: false })
  password: string
}

export const UserSchema = SchemaFactory.createForClass(User)
