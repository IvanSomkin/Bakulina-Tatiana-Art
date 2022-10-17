import { Entity, PrimaryColumn, Column } from 'typeorm';
 
@Entity({ schema: "public" })
export class Admin {
  @PrimaryColumn({ nullable: false })
  public uuid: string;
 
  @Column({ nullable: false, default: 'Default' })
  public name: string;
}