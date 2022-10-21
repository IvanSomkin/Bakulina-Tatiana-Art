/* import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

export enum ParameterType {
  MATERIAL = "Material",
  FRAME_OPTION_PART = "Frame Option Part",
  COLLECTION = "Collection",
  TECHNIQUE = "Technique",
}

@Entity({ schema: "public", name: "parameter" })
export class Parameter {

  @PrimaryGeneratedColumn({ primaryKeyConstraintName: "pk_parameter_id" })
  public id: number

  @Column({
    nullable: false,
    type: "enum",
    enum: ParameterType,
    default: ParameterType.MATERIAL,
  })
  public type: string

  @Column({ nullable: false, default: "Безымянный" })
  public name: string
} */