import { ApiProperty } from '@nestjs/swagger'

export class RenameAdminDto {

  @ApiProperty()
  adminUuid: string

  @ApiProperty()
  formData: {
    newName: string
  }
}