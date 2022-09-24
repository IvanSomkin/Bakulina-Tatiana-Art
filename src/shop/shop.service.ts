import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'
import { ShopItem } from './entities/shop-item.entity'
import { readdir } from 'node:fs/promises';
import { OrderDto } from './dtos/order.dto';
import { ShopItemDto } from './dtos/shop-item.dto';
import { ShopItemsDto } from './dtos/shop-items.dto';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(ShopItem)
    private shopItemRepository: Repository<ShopItem>
  ) {}

  async getShopPage(): Promise<ShopItemsDto> {
    const shop_items = await this.shopItemRepository.find();
    return { 
      shop_items: shop_items
    }
  }

  async getShopItemNoImage(item_id: number): Promise<ShopItem> {
    return await this.shopItemRepository.findOne({
      where: {
        id: item_id
      }
    });
  }

  async getShopItemPage(item_id: number): Promise<ShopItemDto> {
    const shop_item_no_image = await this.getShopItemNoImage(item_id);

    if (shop_item_no_image == null) {
      throw new NotFoundException('Shop item with id ' + item_id + ' was not found')
    }

    const shop_item = new ShopItemDto(shop_item_no_image);
    const image_folder = './public/assets/pictures/shop/' + item_id;
    shop_item.image_paths = await readdir(image_folder);

    return shop_item;
  }

  async sendShopItemOrder(order: OrderDto) {
    const shop_item = await this.getShopItemNoImage(order.shop_item_id);
    if (shop_item == null) {
      throw new NotFoundException('Shop item with id ' + order.shop_item_id + ' was not found and could not be ordered')
    }
    return { order_successful: true };
  }
}
