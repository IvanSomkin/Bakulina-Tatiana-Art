import { ApiProperty } from '@nestjs/swagger'
import { ShopItemEntity } from '../entities/shop-item.entity'

export class ShopItemDto {
  constructor (shopItemEntity: ShopItemEntity) {
    this.id = shopItemEntity.id
    this.name = shopItemEntity.name
    this.price = shopItemEntity.price
    this.sizeX = shopItemEntity.sizeX
    this.sizeY = shopItemEntity.sizeY
    this.imagePaths = []
    if (shopItemEntity.images != undefined) {
      for (let i = 0; i < shopItemEntity.images.length; i++) {
        this.imagePaths.push(shopItemEntity.images[i].image.path)
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
  sizeX: number

  @ApiProperty()
  sizeY: number

  @ApiProperty()
  imagePaths: string[]
}