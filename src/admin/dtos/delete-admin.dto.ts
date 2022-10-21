import { ApiProperty } from '@nestjs/swagger'

export class DeleteAdminDto {
  @ApiProperty()
  public deleterUuid: string

  @ApiProperty()
  public formData: {
    deletedUuid: string
  }
}