import { ApiProperty } from '@nestjs/swagger'

export class SignUpAdminNameDto {
  @ApiProperty()
  public signer_uuid: string

  @ApiProperty()
  public form_data: {
    signed_email: string,
    signed_password: string,
    signed_name: string
  }
}