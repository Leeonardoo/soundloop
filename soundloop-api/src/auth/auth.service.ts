import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'
import { options } from '../config/hash.config'
import * as argon2 from 'argon2'
import { InjectModel } from '@nestjs/mongoose'
import { User } from '../users/users.model'
import { Model } from 'mongoose'

@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async register(
    name: string,
    bio: string,
    nickname: string,
    email: string,
    password: string,
  ): Promise<User> {
    try {
      const newPassword = await argon2.hash(password, options)
      const newUser = new this.userModel({
        name,
        bio,
        nickname,
        email,
        password: newPassword,
      })
      const savedUser = await newUser.save()
      return {
        id: savedUser.id,
        name: savedUser.name,
        bio: savedUser.bio,
        nickname: savedUser.nickname,
        email: savedUser.email,
      } as User
    } catch (err) {
      throw new InternalServerErrorException(
        'An error has occurred while trying to register. Try again.',
      )
    }
  }

  async login(email: string, password: string): Promise<User> {
    let user
    try {
      user = await this.userModel.findOne({ email }, '+password').exec()

      if (await argon2.verify(user.password, password)) {
        user.password = undefined
      } else {
        user = undefined
      }
    } catch (err) {
      throw new NotFoundException('Invalid e-mail or password')
    }
    if (!user) {
      throw new NotFoundException('Invalid e-mail or password')
    }

    return {
      id: user.id,
      name: user.name,
      bio: user.bio,
      nickname: user.nickname,
      email: user.email,
    } as User
  }
}
