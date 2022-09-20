import { Entity, PrimaryColumn, Column } from 'typeorm';
 
@Entity({ schema: "shop" })
export class Material {
  @PrimaryColumn()
  public id: number;
 
  @Column()
  public name: string;
}