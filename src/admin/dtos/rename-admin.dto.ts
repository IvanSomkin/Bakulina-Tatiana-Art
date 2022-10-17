import { ApiProperty } from '@nestjs/swagger'

export class RenameAdminDto {

  @ApiProperty()
  admin_uuid: string

  @ApiProperty()
  form_data: {
    new_name: string
  }
}