import { ApiProperty } from '@nestjs/swagger'

export class RemoveShopItemDto {
  @ApiProperty()
  shopItemId: number
}