import { ApiProperty } from '@nestjs/swagger'

export class SignUpAdminNameDto {
  @ApiProperty()
  public signerUuid: string

  @ApiProperty()
  public formData: {
    signedEmail: string,
    signedPassword: string,
    signedName: string
  }
}