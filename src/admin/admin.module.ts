import { MiddlewareConsumer, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ShopService } from '../shop/shop.service'
import { ShopItemEntity } from '../shop/entities/shop-item.entity'
import { AdminController } from './admin.controller'
import { AdminService } from './admin.service'
import { Admin } from './entities/admin.entity'
import { AuthMiddleware } from '../auth/middleware/auth.middleware'
import { ShopItemImageEntity } from '../shop/entities/shop-item-image.entity'
import { ImageEntity } from '../common/entities/image.entity'
import { AuthModule } from '../auth/auth.module'
import { AdminSettingsGateway } from './gateways/admin-settings.gateway'

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      ShopItemEntity,
      ShopItemImageEntity,
      ImageEntity,
      Admin,
    ]),
  ],
  controllers: [
    AdminController,
  ],
  providers: [
    AdminService,
    ShopService,
    AdminSettingsGateway,
  ],
})
export class AdminModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*')
  }
}