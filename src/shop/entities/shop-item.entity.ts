import { Entity, PrimaryColumn, Column } from 'typeorm';
 
@Entity({ schema: "shop" })
export class ShopItem {
  @PrimaryColumn()
  public id: number;
 
  @Column()
  public name: string;
 
  @Column()
  public size_x: number;

  @Column()
  public size_y: number;

  @Column()
  public price: number;
}