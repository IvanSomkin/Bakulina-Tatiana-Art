import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { ConfigService } from '@nestjs/config'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import supertokens from 'supertokens-node'
import { join } from 'path'

import { AppModule } from './app.module'
import { HttpExceptionFilter } from './common/filters/http-exception.filter'
import { engine } from 'express-handlebars'


import { SupertokensExceptionFilter, TryRefreshTokenExceptionFilter } from './auth/filters/auth.filter'
import { middleware } from 'supertokens-node/framework/express'
import { HttpService } from '@nestjs/axios'


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  const configService: ConfigService = app.get(ConfigService)

  app.useStaticAssets(join(__dirname, '..', 'public'))

  app.engine('.hbs', engine({
    extname: '.hbs',
    defaultLayout: false,
    partialsDir: [
      join(__dirname, '..', 'views/partials'),
      join(__dirname, '..', 'views/admin/mains'),
      join(__dirname, '..', 'views/customer/mains'),
    ],
    helpers: {
      isTrueOrUndefined(value: boolean) {
        return value == true || value == undefined
      },
      hasLessThan10Elements(arr: any[]) {
        return arr == undefined || arr.length < 10
      },
    },
  }))
  app.set('view engine', '.hbs')
  app.set('views', ['./views/customer', './views/admin'])

  const config = new DocumentBuilder()
    .setTitle('Bakulina Tatiana Art Shop')
    .setDescription('The API of the Bakulina Tatiana art shop.')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  app.enableCors({
    origin: ['http://localhost:3000'],
    allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
    credentials: true,
  })

  app.use(middleware())

  app.useGlobalFilters(
    new SupertokensExceptionFilter(),
    new HttpExceptionFilter(),
    new TryRefreshTokenExceptionFilter(new HttpService),
  )

  console.log("App started!")

  await app.listen(configService.get('PORT') || 3000)
}
bootstrap()
