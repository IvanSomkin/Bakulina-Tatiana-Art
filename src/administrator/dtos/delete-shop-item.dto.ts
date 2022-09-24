import { ApiProperty } from '@nestjs/swagger';

export class DeleteShopItemDto {
  @ApiProperty()
  shop_item_id: number;

  @ApiProperty()
  admin_login: string;

  @ApiProperty()
  admin_password: string;
}