import { Entity, PrimaryColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { FrameOption } from './frame-option.entity';
import { Material } from './material.entity';
import { ApiProperty } from '@nestjs/swagger';
 
export enum Status {
  SELLING = "Selling",
  CUSTOM = "Custom",
  REMOVED = "Removed",
}

@Entity({ schema: "shop" })
export class ShopItem {
  @ApiProperty()
  @PrimaryColumn()
  public id: number;

  @ApiProperty()
  @Column({default: 0})
  public shop_position: number;
 
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

  @ApiProperty()
  @Column({default: 1})
  public amount_left: number;

  @Column({default: 'Selling'})
  public status: string;

  @ManyToMany(() => Material)
  @JoinTable()
  materials: Material[];

  @OneToMany(() => FrameOption, (frameOption) => frameOption.shop_item)
  frame_options: FrameOption[];
}