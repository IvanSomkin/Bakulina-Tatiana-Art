import { ApiProperty } from '@nestjs/swagger';

export class DeleteShopItemDto {
  @ApiProperty()
  shop_item_id: number;
}