import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'
import { ShopItem } from './entities/shop-item.entity'
import { readdir } from 'node:fs/promises';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(ShopItem)
    private shopItemRepository: Repository<ShopItem>
  ) {}

  async getShopPage() {
    try {
      const shop_items = await this.shopItemRepository.find();
      return { 
        shop_items: shop_items
      };
    } catch (error) {
      return { 
        shop_gallery_error: '<p class="shop__gallery__error">Не удалось загрузить товары! :(<br>' + error.message + '</p>'
      };
    }
  }

  async getItemPage(item_id : string) {
    const shop_item = await this.shopItemRepository.findOne({
      where: {
        id: Number(item_id),
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
}
