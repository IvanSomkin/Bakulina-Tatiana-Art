import { ApiProperty } from '@nestjs/swagger';
import { ShopItem } from '../../shop/entities/shop-item.entity';

export class ChangeShopItemDto {
  @ApiProperty()
  shop_item: ShopItem;
}