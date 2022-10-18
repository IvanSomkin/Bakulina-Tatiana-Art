import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ImageEntity } from '../common/entities/image.entity'
import { ShopItemImageEntity } from './entities/shop-item-image.entity'
import { ShopItemEntity } from './entities/shop-item.entity'
import { ShopController } from './shop.controller'
import { ShopService } from './shop.service'

@Module({
  imports: [TypeOrmModule.forFeature([ShopItemEntity, ShopItemImageEntity, ImageEntity])],
  controllers: [ShopController],
  providers: [ShopService],
})
export class ShopModule { }
