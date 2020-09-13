import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { User } from '../users/users.model'
import { AuthGuard } from '@nestjs/passport'
import { LocalAuthGuard } from './local-auth.guard'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<any> {
    return this.authService.login(req.user)
  }

  /*  @Post('register')
  async register(
    @Body('name') name: string,
    @Body('bio') bio: string,
    @Body('nickname') nickname: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<User> {
    return await this.authService.register(name, bio, nickname, email, password)
  }*/

  @Post('password-recovery')
  async recoverPassword(): Promise<string> {
    return 'Password changed!'
  }
}
