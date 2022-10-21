import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ShopModule } from './shop/shop.module'
import { DatabaseModule } from './database/database.module'
import { AdminModule } from './admin/admin.module'
import { AuthModule } from './auth/auth.module'
import { ContactsController, PrivacyController } from './app.controller'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    AuthModule.forRoot({
      connectionURI: "https://ad7b2b9147d511edbba23d4fc8a6f474-eu-west-1.aws.supertokens.io:3569",
      apiKey: "C43vGFsvXK7z=03jGV9y=Ez-R-aRc0",
      appInfo: {
        appName: "bakulina-tatiana-art",
        apiDomain: "http://localhost:3000",
        websiteDomain: "http://localhost:3000",
        apiBasePath: "/auth",
        websiteBasePath: "/administrator/login"
      },
    }),
    ShopModule,
    DatabaseModule,
    AdminModule,
    AuthModule,
  ],
  controllers: [
    ContactsController,
    PrivacyController
  ]
})
export class AppModule { }
