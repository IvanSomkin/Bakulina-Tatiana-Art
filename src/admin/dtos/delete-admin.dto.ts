import { ApiProperty } from '@nestjs/swagger'

export class DeleteAdminDto {
  @ApiProperty()
  public deleter_uuid: string

  @ApiProperty()
  public form_data: {
    deleted_uuid: string
  }
}