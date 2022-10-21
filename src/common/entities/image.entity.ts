import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'

@Unique("uq_image", ["id"])
@Entity({ schema: "public", name: "image" })
export class ImageEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: "image_pk" })
  public id: number

  @ApiProperty()
  @Column({ nullable: false, default: '' })
  public path: string
}