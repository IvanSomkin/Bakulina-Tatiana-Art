import {
  MiddlewareConsumer,
  Module,
  NestModule,
  DynamicModule,
} from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthMiddleware } from './middleware/auth.middleware'
import { ConfigInjectionToken, AuthModuleConfig } from './interfaces/config.interface'
import { SupertokensService } from './supertokens/supertokens.service'
import { AuthGuard } from './guards/auth.guard'
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [HttpModule.register({

  })],
  providers: [],
  exports: [],
  controllers: [AuthController],
})
export class AuthModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*')
  }

  static forRoot({ connectionURI, apiKey, appInfo }: AuthModuleConfig): DynamicModule {
    return {
      providers: [
        {
          useValue: {
            appInfo,
            connectionURI,
            apiKey,
          },
          provide: ConfigInjectionToken,
        },
        SupertokensService,
        AuthGuard,
      ],
      exports: [],
      imports: [],
      module: AuthModule,
    }
  }
}