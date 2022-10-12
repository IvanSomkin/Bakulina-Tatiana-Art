import { ApiProperty } from '@nestjs/swagger';

export class RemoveShopItemDto {
  @ApiProperty()
  shop_item_id: number;
}