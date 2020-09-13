import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import * as argon2 from 'argon2'
import { UsersService } from '../users/users.service'
import { User } from '../users/users.model'
import { JwtService } from '@nestjs/jwt'
import { RouterExecutionContext } from '@nestjs/core/router/router-execution-context'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  /*async register(
    name: string,
    bio: string,
    nickname: string,
    email: string,
    password: string,
  ): Promise<User> {
    return await
  }*/

  async validateUser(username: string, password: string): Promise<User> {
    let user: User
    try {
      if (username.indexOf('@') === -1) {
        user = await this.usersService.findByUsername(username)
      } else {
        user = await this.usersService.findByEmail(username)
      }

      if (await argon2.verify(user.password, password)) {
        user.password = undefined
        user.__v = undefined
      } else {
        user = undefined
      }
    } catch (err) {
      throw new UnauthorizedException('Wrong username/e-mail or password')
    }
    if (!user) {
      throw new UnauthorizedException('Wrong username/e-mail or password')
    }

    return user
  }

  async login(user: User): Promise<any> {
    const payload = {
      username: user.username,
      email: user.email,
      sub: user._id,
    }
    return {
      access_token: this.jwtService.sign(payload),
      ...user.toObject(),
    }
  }
}
