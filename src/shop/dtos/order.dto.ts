import { ApiProperty } from '@nestjs/swagger';

export class OrderDto {
  @ApiProperty()
  shop_item_id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;
  
  @ApiProperty()
  phone: string;

  @ApiProperty()
  personal: string;
}