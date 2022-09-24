import { ApiProperty } from '@nestjs/swagger';

export class MaterialDto {
  @ApiProperty()
  item_id: number;

  @ApiProperty()
  name: string;
}