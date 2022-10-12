import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShopItem, ShopItemStatus } from '../shop/entities/shop-item.entity';
import { Repository } from 'typeorm';
import { RemoveShopItemDto } from './dtos/remove-shop-item.dto';
import { ChangeShopItemDto } from './dtos/change-shop-item.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(ShopItem)
    private shopItemRepository: Repository<ShopItem>,
  ) { }

  async createShopItem(): Promise<number> {
    let new_item: ShopItem = this.shopItemRepository.create();
    const max_shop_position = await this.shopItemRepository
      .createQueryBuilder("shop_item")
      .select("MAX(shop_item.shop_position)", "max")
      .getRawOne();
    new_item.shop_position = max_shop_position + 1;
    this.shopItemRepository.save(new_item);
    return new_item.id;
  }

  async removeShopItem(removeShopItemDto: RemoveShopItemDto) {
    const item_id = removeShopItemDto.shop_item_id;
    let item = await this.shopItemRepository.findOne(
      {
        where: {
          id: item_id
        }
      }
    );
    item.status = ShopItemStatus.REMOVED;
    this.shopItemRepository.save(item);
    this.shopItemRepository.softDelete(item_id);
  }

  async changeShopItem(changeShopItemDto: ChangeShopItemDto) {
    const item: ShopItem = changeShopItemDto.shop_item;
    this.shopItemRepository.save(item);
  }
}

