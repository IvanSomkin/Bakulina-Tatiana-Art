import { ApiProperty } from '@nestjs/swagger';

export class CreateShopItemResponseDto {
  @ApiProperty()
  created_item_id: number;
}