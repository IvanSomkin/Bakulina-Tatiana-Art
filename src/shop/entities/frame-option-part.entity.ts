import { Entity, PrimaryColumn, Column } from 'typeorm';
 
@Entity()
export class FrameOptionPart {
  @PrimaryColumn()
  public id: number;
 
  @Column()
  public name: string;
}