import { ApiProperty } from '@nestjs/swagger'
import { ShopItemEntity } from '../../shop/entities/shop-item.entity'

export class ChangeShopItemDto {
  @ApiProperty()
  shopItem: ShopItemEntity
}