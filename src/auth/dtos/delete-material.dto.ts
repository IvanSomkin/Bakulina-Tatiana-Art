import { ApiProperty } from '@nestjs/swagger';

export class DeleteMaterialDto {
  @ApiProperty()
  material_id: number;
}