import { Entity, PrimaryColumn, Column, ManyToMany, JoinTable, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FrameOption } from './frame-option.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Parameter } from './parameter.entity';
 
export enum ShopItemStatus {
  SELLING = "Selling",
  CUSTOM = "Custom",
  REMOVED = "Removed",
}

@Entity({ schema: "shop" })
export class ShopItem {
  @ApiProperty()
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: "pk_shop_item_id" })
  public id: number;
  
  @ApiProperty()
  @Column({nullable: false, default: 0})
  public shop_position: number;
 
  @ApiProperty()
  @Column({nullable: true, default: null})
  public name: string;
 
  @ApiProperty()
  @Column({nullable: true, default: null})
  public size_x: number;

  @ApiProperty()
  @Column({nullable: true, default: null})
  public size_y: number;

  @ApiProperty()
  @Column({nullable: true, default: null})
  public price: number;

  @ApiProperty()
  @Column({nullable: false, default: 1})
  public amount_left: number;

  @Column({
    nullable: false,
    type: "enum",
    enum: ShopItemStatus,
    enumName: "shop_item_status",
    default: ShopItemStatus.SELLING,
  })
  public status: string;

  /*
  @ManyToMany(() => Parameter)
  @JoinTable()
  materials: Parameter[];

  @OneToMany(() => FrameOption, (frameOption) => frameOption.shop_item_id)
  frame_options: FrameOption[];
  */
}