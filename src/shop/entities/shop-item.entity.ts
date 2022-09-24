import { Entity, PrimaryColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { FrameOption } from './frame-option.entity';
import { Material } from './material.entity';
import { ApiProperty } from '@nestjs/swagger';
 
@Entity({ schema: "shop" })
export class ShopItem {
  @ApiProperty()
  @PrimaryColumn()
  public id: number;
 
  @ApiProperty()
  @Column()
  public name: string;
 
  @ApiProperty()
  @Column()
  public size_x: number;

  @ApiProperty()
  @Column()
  public size_y: number;

  @ApiProperty()
  @Column()
  public price: number;

  @ManyToMany(() => Material)
  @JoinTable()
  materials: Material[]

  @OneToMany(() => FrameOption, (frameOption) => frameOption.shop_item)
  frame_options: FrameOption[]
}