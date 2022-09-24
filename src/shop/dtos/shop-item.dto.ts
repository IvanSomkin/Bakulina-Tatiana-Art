import { ApiProperty } from '@nestjs/swagger';
import { ShopItem } from '../entities/shop-item.entity';

export class ShopItemDto {
  constructor(shopItem: ShopItem) {
    this.item_id = shopItem.id;
    this.name = shopItem.name;
    this.price = shopItem.price;
    this.size_x = shopItem.size_x;
    this.size_y = shopItem.size_y;
  }

  @ApiProperty()
  item_id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  size_x: number;

  @ApiProperty()
  size_y: number;

  @ApiProperty()
  image_paths: string[];
}