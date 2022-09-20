import { Entity, PrimaryColumn, Column } from 'typeorm';
 
@Entity({ schema: "shop" })
export class FrameOptionPart {
  @PrimaryColumn()
  public id: number;
 
  @Column()
  public name: string;
}