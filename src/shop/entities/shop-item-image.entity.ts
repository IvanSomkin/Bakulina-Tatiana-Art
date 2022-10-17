import { Entity, PrimaryColumn, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { ImageEntity } from '../../common/entities/image.entity';
import { ShopItemEntity } from './shop-item.entity';

@Unique("uq_shop_item_image", ["image"])
@Entity({ schema: "public", name: "shop_item_image" })
export class ShopItemImageEntity {

  @PrimaryGeneratedColumn({ primaryKeyConstraintName: "pk_shop_item_image_id" })
  public shop_item_image_id: number

  @ManyToOne(() => ShopItemEntity, shop_item => shop_item.images)
  @JoinColumn({
    name: "shop_item_id",
    referencedColumnName: "shop_item_id",
    foreignKeyConstraintName: "fk_shop_item_id",
  })
  public shop_item_id: number

  @ApiProperty()
  @OneToOne(() => ImageEntity, image => image.image_id)
  @JoinColumn({
    name: "image_id",
    referencedColumnName: "image_id",
    foreignKeyConstraintName: "fk_image_id",
  })
  public image: ImageEntity

  @ApiProperty()
  @Column({ nullable: false, default: 0 })
  public order: number
}