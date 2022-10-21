import { ApiProperty } from '@nestjs/swagger'

export class OrderDto {
  @ApiProperty()
  shopItemId: number

  @ApiProperty()
  name: string

  @ApiProperty()
  email: string

  @ApiProperty()
  phone: string

  @ApiProperty()
  personal: string
}