import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ShopModule } from './shop/shop.module'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    ShopModule,
    DatabaseModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
