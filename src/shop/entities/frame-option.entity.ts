import { Entity, PrimaryColumn, Column } from 'typeorm';
 
@Entity({ schema: "shop" })
export class FrameOption {
  @PrimaryColumn()
  public id: number;
 
  @Column()
  public description_tag: string;

  @Column()
  public option_text: string;
}