import { ApiProperty } from '@nestjs/swagger';

export class AdminLoginDto {
  @ApiProperty()
  admin_login: string;

  @ApiProperty()
  admin_password: string;
}