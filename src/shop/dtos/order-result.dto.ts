import { ApiProperty } from '@nestjs/swagger'

export class OrderResultDto {
  @ApiProperty()
  orderSuccessful: boolean

  @ApiProperty()
  orderErrorMessage?: string
}