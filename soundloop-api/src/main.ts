import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as argon2 from 'argon2'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(3000)
}

bootstrap()
