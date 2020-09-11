import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { User } from '../users/users.model'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<User> {
    return await this.authService.login(email, password)
  }

  @Post('register')
  async register(
    @Body('name') name: string,
    @Body('bio') bio: string,
    @Body('nickname') nickname: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<User> {
    return await this.authService.register(name, bio, nickname, email, password)
  }

  @Post('password-recovery')
  async recoverPassword() {
    return 'Password changed!'
  }
}
