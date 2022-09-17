import { Entity, PrimaryColumn, Column } from 'typeorm';
 
@Entity()
export class Material {
  @PrimaryColumn()
  public id: number;
 
  @Column()
  public name: string;
}