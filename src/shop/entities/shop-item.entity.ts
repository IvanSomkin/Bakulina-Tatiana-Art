import { Entity, Column, OneToMany, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'
import { Admin } from '../../admin/entities/admin.entity'
// import { FrameOption } from './frame-option.entity'
// import { Parameter } from './parameter.entity'
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

  @PrimaryGeneratedColumn({
    name: "id",
    primaryKeyConstraintName: "shop_item_pk",
  })
  public id: number

  @Column({
    name: "name",
    nullable: true,
  })
  public name: string

  @Column({
    name: "size_x",
    nullable: true,
  })
  public sizeX: number

  @Column({
    name: "size_y",
    nullable: true,
  })
  public sizeY: number

  @Column({
    name: "price",
    nullable: true,
  })
  public price: number

  @Column({
    name: "position",
    nullable: false,
    default: 0,
  })
  public position: number

  @Column({
    name: "quantity_left",
    nullable: false, default: 1,
  })
  public quantityLeft: number

  @Column({
    nullable: false,
    type: "enum",
    enum: ShopItemStatus,
    enumName: "shop_item_status",
    default: ShopItemStatus.SELLING,
  })
  public status: string

  @Column({
    name: "preview_image_path",
    nullable: false,
    default: '',
  })
  public previewImagePath: string

  @OneToMany(() => ShopItemImageEntity, (shopItemImage) => shopItemImage.shopItem)
  images: ShopItemImageEntity[]

  @ManyToOne(() => Admin, (admin) => admin.shopItems)
  @JoinColumn({
    name: "created_by_admin_uuid",
  })
  admin: Admin

  /* @ManyToMany(() => Parameter)
  @JoinTable()
  materials: Parameter[]

  @OneToMany(() => FrameOption, (frameOption) => frameOption.shopItemId)
  frameOptions: FrameOption[] */
}