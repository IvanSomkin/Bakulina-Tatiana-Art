import { ApiProperty } from '@nestjs/swagger'

export class SignUpAdminNameDto {
  @ApiProperty()
  public creator_uuid: string

  @ApiProperty()
  public form_data: {
    created_email: string,
    created_password: string,
    created_name: string
  }
}