import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express'
import * as path from 'path'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  })
  await app.useStaticAssets(path.join(__dirname, '../public'))
  await app.listen(3000)
}

bootstrap()

console.log('Public path is: ' + path.join(__dirname, '../public'))
