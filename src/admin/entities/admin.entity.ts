import { Entity, PrimaryColumn, Column } from 'typeorm';
 
@Entity({ schema: "admin" })
export class Admin {
  @PrimaryColumn()
  public login: string;
 
  @Column()
  public password: string;
}