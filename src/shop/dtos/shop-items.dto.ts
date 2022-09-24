import { ApiProperty } from '@nestjs/swagger';
import { ShopItem } from '../entities/shop-item.entity';

export class ShopItemsDto {
  @ApiProperty()
  shop_items: ShopItem[]
}