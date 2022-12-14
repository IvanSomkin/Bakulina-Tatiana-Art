import { ApiProperty } from '@nestjs/swagger'
import { ShopItemEntity } from '../entities/shop-item.entity'

export class ShopItemsDto {
  @ApiProperty()
  shopItems: ShopItemEntity[]
}