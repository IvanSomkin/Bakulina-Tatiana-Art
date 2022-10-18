import { ApiProperty } from '@nestjs/swagger'

export class OrderResultDto {
  @ApiProperty()
  order_successful: boolean
}