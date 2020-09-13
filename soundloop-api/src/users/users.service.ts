import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from './users.model'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findById(id: string): Promise<User> {
    try {
      return await this.userModel.findOne({ _id: id }).exec()
    } catch (e) {
      throw new NotFoundException('User not found')
    }
  }

  /**
   * Finds a user by the given email with hashed password included. Should
   * only be used for authentication.
   * @param email
   * @returns Promise<User>
   */
  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }, '+password').lean()
  }

  /**
   * Finds a user by the given username with hashed password included.
   * Should only be used for authentication.
   * @param username
   * @returns Promise<User>
   */
  async findByUsername(username: string): Promise<User> {
    try {
      return await this.userModel.findOne({ username }, '+password').exec()
    } catch (e) {
      throw new NotFoundException('User not found')
    }
  }

  /**
   * Creates a new user and saves it on the database with a hashed password.
   * @throws UnprocessableEntityException if a user with the given username/email
   * already exists
   * @throws InternalServerErrorException if another unknown error occurs
   * @param user
   * @returns Promise<User>
   */
  async createNewUser(user: User): Promise<User> {
    if (await this.userModel.findOne({ email: user.email }).exec()) {
      throw new UnprocessableEntityException(
        'A user with this email already exists',
      )
    }
    if (await this.userModel.findOne({ username: user.username }).exec()) {
      throw new UnprocessableEntityException(
        'A user with this username already exists',
      )
    }

    try {
      const newUser = new this.userModel({
        name: user.name,
        bio: user.bio,
        username: user.username,
        email: user.email,
        password: user.password,
      })
      /*const savedUser = await newUser.save()
      return {
        id: savedUser.id,
        name: savedUser.name,
        bio: savedUser.bio,
        username: savedUser.username,
        email: savedUser.email,
      } as User*/
      return await newUser.save()
    } catch (e) {
      throw new InternalServerErrorException(
        'An error has occurred while trying to register. Try again',
      )
    }
  }
}
