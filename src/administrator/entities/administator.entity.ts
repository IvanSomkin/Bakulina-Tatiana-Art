import { Entity, PrimaryColumn, Column } from 'typeorm';
 
@Entity({ schema: "administrator" })
export class Administrator {
  @PrimaryColumn()
  public login_hash: string;
 
  @Column()
  public password_hash: string;
}