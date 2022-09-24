import { ApiProperty } from '@nestjs/swagger';
import { ShopItem } from 'src/shop/entities/shop-item.entity';

export class ChangeShopItemDto {
  @ApiProperty()
  shop_item: ShopItem;

  @ApiProperty()
  admin_login: string;

  @ApiProperty()
  admin_password: string;
}