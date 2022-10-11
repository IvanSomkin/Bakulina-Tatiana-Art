import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { ShopService } from '../shop/shop.service';
import { ShopItem } from '../shop/entities/shop-item.entity';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { Admin } from './entities/admin.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin, ShopItem]),
  ],
  controllers: [AdminController],
  providers: [
    AdminService,
    ShopService,
  ],
})
export class AdminModule {}