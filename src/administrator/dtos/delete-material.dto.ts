import { ApiProperty } from '@nestjs/swagger';

export class DeleteMaterialDto {
  @ApiProperty()
  material_id: number;

  @ApiProperty()
  admin_login: string;

  @ApiProperty()
  admin_password: string;
}