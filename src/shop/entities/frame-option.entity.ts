import { Entity, PrimaryColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { FrameOptionPart } from './frame-option-part.entity';
import { ShopItem } from './shop-item.entity';
 
@Entity({ schema: "shop" })
export class FrameOption {
  @PrimaryColumn()
  @ManyToOne(() => ShopItem, (shop_item) => shop_item.frame_options)
  public shop_item: number;

  @PrimaryColumn()
  public variant_id: number;

  @Column()
  public price: number;

  @ManyToMany(() => FrameOptionPart)
  @JoinTable()
  parts: FrameOptionPart[]
}