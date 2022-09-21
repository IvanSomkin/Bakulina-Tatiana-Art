import { Entity, PrimaryColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { FrameOption } from './frame-option.entity';
import { Material } from './material.entity';
 
@Entity({ schema: "shop" })
export class ShopItem {
  @PrimaryColumn()
  public id: number;
 
  @Column()
  public name: string;
 
  @Column()
  public size_x: number;

  @Column()
  public size_y: number;

  @Column()
  public price: number;

  @ManyToMany(() => Material)
  @JoinTable()
  materials: Material[]

  @OneToMany(() => FrameOption, (frameOption) => frameOption.shop_item)
  frame_options: FrameOption[]
}