import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ShopModule } from './shop/shop.module'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { ContactsModule } from './contacts/contacts.module';
import { AdminModule } from './administrator/administrator.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    ShopModule,
    DatabaseModule,
    PortfolioModule,
    ContactsModule,
    AdminModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
