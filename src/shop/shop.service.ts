import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ShopItemEntity } from './entities/shop-item.entity'
import { OrderDto } from './dtos/order.dto'
import { ShopItemDto } from './dtos/shop-item.dto'
import { ShopItemsDto } from './dtos/shop-items.dto'
import { OrderResultDto } from './dtos/order-result.dto'

@Injectable()
export class ShopService {
  constructor (
    @InjectRepository(ShopItemEntity)
    private shopItemRepository: Repository<ShopItemEntity>,
  ) { }

  async getShopItemEntities(): Promise<ShopItemEntity[]> {
    const shopItemEntities = await this.shopItemRepository.find({
      order: {
        position: "ASC",
      },
      relations: {
        images: false,
      },
    })
    return shopItemEntities
  }

  async getShopItem(itemId: number): Promise<ShopItemDto> {
    let shopItemEntity = await this.shopItemRepository.findOne({
      where: {
        id: itemId
      },
      relations: {
        images: {
          image: true,
        },
      },
    })

    if (shopItemEntity == null) {
      throw new NotFoundException('Shop item with id ' + itemId + ' was not found')
    }

    const shopItemDto = new ShopItemDto(shopItemEntity)

    return shopItemDto
  }

  async sendShopItemOrder(order: OrderDto): Promise<void> {
    const shopItem = await this.shopItemRepository.findOne({
      where: {
        id: order.shopItemId,
      },
      relations: {
        images: false,
      },
    })
    if (shopItem == null) {
      throw new NotFoundException(
        'Shop item with id ' + order.shopItemId + ' was not found and could not be ordered'
      )
    }
  }
}
