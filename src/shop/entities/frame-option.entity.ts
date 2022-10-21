/* import { Entity, PrimaryColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm'
import { Parameter } from './parameter.entity'
import { ShopItemEntity } from './shop-item.entity'

@Entity({ schema: "public", name: "frame_option" })
export class FrameOption {

  @PrimaryColumn()
  @ManyToOne(() => ShopItemEntity, (shopItem) => shopItem.frameOptions)
  public shopItemId: number;

  @PrimaryColumn({ nullable: false, default: 0 })
  public frameOptionNumber: number

  @Column({ nullable: false, default: 0 })
  public price: number

  @ManyToMany(() => Parameter)
  @JoinTable()
  parts: Parameter[]
} */