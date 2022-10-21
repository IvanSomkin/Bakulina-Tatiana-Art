import { ApiProperty } from '@nestjs/swagger'

export class CreateShopItemResponseDto {
  @ApiProperty()
  createdItemId: number
}