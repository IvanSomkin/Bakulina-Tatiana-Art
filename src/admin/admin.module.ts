import { MiddlewareConsumer, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ShopService } from '../shop/shop.service'
import { ShopItemEntity } from '../shop/entities/shop-item.entity'
import { AdminPageController, AdminSettingsController } from './admin.controller'
import { AdminService } from './admin.service'
import { Admin } from './entities/admin.entity'
import { AuthMiddleware } from '../auth/middleware/auth.middleware'
import { ShopItemImageEntity } from '../shop/entities/shop-item-image.entity'
import { ImageEntity } from '../common/entities/image.entity'
import { AuthModule } from '../auth/auth.module'
import { AdminGateway } from './gateways/admin.gateway'

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      ShopItemEntity,
      ShopItemImageEntity,
      ImageEntity,
      Admin
    ]),
  ],
  controllers: [
    AdminPageController,
    AdminSettingsController
  ],
  providers: [
    AdminService,
    ShopService,
    AdminGateway,
  ],
})
export class AdminModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*')
  }
}