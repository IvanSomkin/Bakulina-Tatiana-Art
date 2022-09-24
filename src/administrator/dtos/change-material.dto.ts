import { ApiProperty } from '@nestjs/swagger';
import { Material } from 'src/shop/entities/material.entity';

export class ChangeMaterialDto {
  @ApiProperty()
  material: Material;

  @ApiProperty()
  admin_login: string;

  @ApiProperty()
  admin_password: string;
}