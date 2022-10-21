import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm'
import { ShopItemEntity } from '../../shop/entities/shop-item.entity'

@Entity({ schema: "public" })
export class Admin {
  @PrimaryColumn({ nullable: false })
  public uuid: string

  @Column({ nullable: false, default: 'Default' })
  public name: string

  @OneToMany(() => ShopItemEntity, (shopItemEntity) => shopItemEntity.admin)
  public shopItems: ShopItemEntity[]
}