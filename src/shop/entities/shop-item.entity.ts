import { Entity, Column, OneToMany, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { FrameOption } from './frame-option.entity';
import { Parameter } from './parameter.entity';
import { ShopItemImageEntity } from './shop-item-image.entity';

export enum ShopItemStatus {
  CREATED = "Created",
  SELLING = "Selling",
  CUSTOM = "Custom",
  HIDDEN = "Hidden",
  REMOVED = "Removed",
}

@Entity({ schema: "public", name: "shop_item" })
export class ShopItemEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: "pk_shop_item_id" })
  public shop_item_id: number;

  @ApiProperty()
  @Column({ nullable: false, default: 0 })
  public shop_position: number;

  @ApiProperty()
  @Column({ nullable: true, default: null })
  public name: string;

  @ApiProperty()
  @Column({ nullable: true, default: null })
  public size_x: number;

  @ApiProperty()
  @Column({ nullable: true, default: null })
  public size_y: number;

  @ApiProperty()
  @Column({ nullable: true, default: null })
  public price: number;

  @ApiProperty()
  @Column({ nullable: false, default: 1 })
  public amount_left: number;

  @ApiProperty()
  @Column({
    nullable: false,
    type: "enum",
    enum: ShopItemStatus,
    enumName: "shop_item_status",
    default: ShopItemStatus.SELLING,
  })
  public status: string;

  @OneToMany(() => ShopItemImageEntity, (shop_item_image) => shop_item_image.shop_item_id)
  images: ShopItemImageEntity[];

  @ApiProperty()
  @Column({ nullable: false, default: '' })
  public preview_image_path: string;

  /*
  @ManyToMany(() => Parameter)
  @JoinTable()
  materials: Parameter[];

  @OneToMany(() => FrameOption, (frameOption) => frameOption.shop_item_id)
  frame_options: FrameOption[];
  */
}