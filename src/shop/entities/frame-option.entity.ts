import { Entity, PrimaryColumn, Column } from 'typeorm';
 
@Entity()
export class FrameOption {
  @PrimaryColumn()
  public id: number;
 
  @Column()
  public description_tag: string;

  @Column()
  public option_text: string;
}