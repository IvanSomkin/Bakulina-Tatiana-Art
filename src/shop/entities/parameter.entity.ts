import { Entity, PrimaryColumn, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export enum ParameterType {
  MATERIAL = "Material",
  FRAME_OPTION_PART = "Frame Option Part",
  COLLECTION = "Collection",
  TECHNIQUE = "Technique",
}

@Entity({ schema: "public", name: "parameter" })
export class Parameter {
  @ApiProperty()
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: "pk_parameter_id" })
  public id: number;

  @ApiProperty()
  @Column({
    nullable: false,
    type: "enum",
    enum: ParameterType,
    default: ParameterType.MATERIAL,
  })
  public type: string;

  @ApiProperty()
  @Column({ nullable: false, default: "Безымянный" })
  public name: string;
}