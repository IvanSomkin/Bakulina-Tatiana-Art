import { Entity, PrimaryColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
 
@Entity({ schema: "shop" })
export class Material {
  @ApiProperty()
  @PrimaryColumn()
  public id: number;
 
  @ApiProperty()
  @Column()
  public name: string;
}