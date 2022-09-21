import { Entity, PrimaryColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { FrameOptionPart } from './frame-option-part.entity';
import { ShopItem } from './shop-item.entity';
 
@Entity({ schema: "shop" })
export class FrameOption {
  @PrimaryColumn()
  public id: number;
 
  @ManyToOne(() => ShopItem, (shop_item) => shop_item.frame_options)
  public shop_item: number;

  @Column()
  public description_tag: string;

  @Column()
  public option_text: string;

  @Column()
  public price: number;

  @ManyToMany(() => FrameOptionPart)
  @JoinTable()
  parts: FrameOptionPart[]
}