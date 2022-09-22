import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'
import { ShopItem } from './entities/shop-item.entity'
import { readdir } from 'node:fs/promises';
import { OrderDto } from './dtos/order.dto';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(ShopItem)
    private shopItemRepository: Repository<ShopItem>
  ) {}

  async getShopPage() {
    const shop_items = await this.shopItemRepository.find();
    return { 
      shop_items: shop_items
    }
  }

  async getItemPage(item_id: number) {
    const shop_item = await this.shopItemRepository.findOne({
      where: {
        id: item_id,
      }
    })

    const image_folder = './public/assets/pictures/shop/' + item_id;
    var image_paths = await readdir(image_folder)

    return {
      image_paths: image_paths,
      item_id: item_id,
      name: shop_item.name,
      price: shop_item.price,
      size_x: shop_item.size_x,
      size_y: shop_item.size_y
    }
  }

  async sendItemOrder(order: OrderDto) {
    var item_page = await this.getItemPage(order.item_id)
    return {
      order_successful: true,
      image_paths: item_page.image_paths,
      item_id: item_page.item_id,
      name: item_page.name,
      price: item_page.name,
      size_x: item_page.size_x,
      size_y: item_page.size_y
    }
  }
}
