import { Entity, Column, OneToMany, PrimaryGeneratedColumn, JoinColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { FrameOption } from './frame-option.entity'
import { Parameter } from './parameter.entity'
import { ShopItemImageEntity } from './shop-item-image.entity'

export enum ShopItemStatus {
  CREATED = "Created",
  SELLING = "Selling",
  CUSTOM = "Custom",
  HIDDEN = "Hidden",
  REMOVED = "Removed",
}

@Entity({ schema: "public", name: "shop_item" })
export class ShopItemEntity {

  @PrimaryGeneratedColumn({ primaryKeyConstraintName: "pk_shop_item_id" })
  public shopItemId: number

  @Column({ nullable: false, default: 0 })
  public shopPosition: number

  @Column({ nullable: true, default: null })
  public name: string

  @Column({ nullable: true, default: null })
  public sizeX: number

  @Column({ nullable: true, default: null })
  public sizeY: number

  @Column({ nullable: true, default: null })
  public price: number

  @Column({ nullable: false, default: 1 })
  public quantityLeft: number

  @Column({
    nullable: false,
    type: "enum",
    enum: ShopItemStatus,
    enumName: "shop_item_status",
    default: ShopItemStatus.SELLING,
  })
  public status: string

  @OneToMany(() => ShopItemImageEntity, (shopItemImage) => shopItemImage.shopItem)
  images: ShopItemImageEntity[]

  @Column({ nullable: false, default: '' })
  public previewImagePath: string

  /* @ManyToMany(() => Parameter)
  @JoinTable()
  materials: Parameter[]

  @OneToMany(() => FrameOption, (frameOption) => frameOption.shop_item_id)
  frame_options: FrameOption[] */
}