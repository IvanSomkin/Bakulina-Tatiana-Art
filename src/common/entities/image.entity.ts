import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Unique("uq_image", ["image_id"])
@Entity({ schema: "public", name: "image" })
export class ImageEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: "pk_image_id" })
  public image_id: number;

  @ApiProperty()
  @Column({ nullable: false, default: '' })
  public path: string;
}