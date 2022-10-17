import { ApiProperty } from '@nestjs/swagger'
import { ShopItemEntity } from '../entities/shop-item.entity'

export class ShopItemDto {
  constructor(shopItemEntity: ShopItemEntity) {
    this.id = shopItemEntity.shop_item_id
    this.name = shopItemEntity.name
    this.price = shopItemEntity.price
    this.size_x = shopItemEntity.size_x
    this.size_y = shopItemEntity.size_y
    this.image_paths = [];
    if (shopItemEntity.images != undefined) {
      for (let i = 0; i < shopItemEntity.images.length; i++) {
        this.image_paths.push(shopItemEntity.images[i].image.path)
      }
    }
  }

  @ApiProperty()
  id: number

  @ApiProperty()
  name: string

  @ApiProperty()
  price: number

  @ApiProperty()
  size_x: number

  @ApiProperty()
  size_y: number

  @ApiProperty()
  image_paths: string[]
}