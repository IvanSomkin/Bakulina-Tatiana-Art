import { ApiProperty } from '@nestjs/swagger';

export class CreateShopItemResponseDto {
  @ApiProperty()
  created_shop_item_id: number;
}