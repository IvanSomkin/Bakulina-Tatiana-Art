import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne, Unique } from 'typeorm'
import { ImageEntity } from '../../common/entities/image.entity'
import { ShopItemEntity } from './shop-item.entity'

@Unique("shop_item_image_uq", ["image"])
@Entity({ schema: "public", name: "shop_item_image" })
export class ShopItemImageEntity {

  @PrimaryGeneratedColumn({
    name: "id",
    primaryKeyConstraintName: "shop_item_image_pk"
  })
  public id: number

  @ManyToOne(() => ShopItemEntity, shop_item => shop_item.images)
  @JoinColumn({
    name: "shop_item_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "shop_item_image_fk_shop_item",
  })
  public shopItem: ShopItemEntity

  @OneToOne(() => ImageEntity, image => image.image_id)
  @JoinColumn({
    name: "image_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "shop_item_image_fk_image",
  })
  public image: ImageEntity

  @Column({
    name: "position",
    nullable: false,
    default: 0
  })
  public position: number
}