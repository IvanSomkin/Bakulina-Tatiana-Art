import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'
import { ShopItemEntity } from './entities/shop-item.entity'
import { OrderDto } from './dtos/order.dto';
import { ShopItemDto } from './dtos/shop-item.dto';
import { ShopItemsDto } from './dtos/shop-items.dto';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(ShopItemEntity)
    private shopItemRepository: Repository<ShopItemEntity>,
  ) { }

  async getShopItemsOnlyPreview(): Promise<ShopItemsDto> {
    const shop_items = await this.shopItemRepository.find({
      order: {
        shop_position: "ASC",
      },
      relations: {
        images: false,
      },
    });

    return {
      shop_items: shop_items
    }
  }

  async getShopItem(item_id: number): Promise<ShopItemDto> {
    let shop_item_entity = await this.shopItemRepository.findOne({
      where: {
        shop_item_id: item_id
      },
      relations: {
        images: {
          image: true,
        },
      },
    });

    if (shop_item_entity == null) {
      throw new NotFoundException('Shop item with id ' + item_id + ' was not found')
    }

    const shop_item_dto = new ShopItemDto(shop_item_entity)

    return shop_item_dto
  }

  async sendShopItemOrder(order: OrderDto) {
    const shop_item = await this.shopItemRepository.findOne({
      where: {
        shop_item_id: order.shop_item_id,
      },
      relations: {
        images: false,
      },
    })
    if (shop_item == null) {
      throw new NotFoundException(
        'Shop item with id ' + order.shop_item_id + ' was not found and could not be ordered'
      )
    }
    return { order_successful: true }
  }
}
