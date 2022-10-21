import { Body, Controller, Get, Param, Res, Render, Post, Redirect, UseInterceptors, NotFoundException, UseFilters, HttpException } from '@nestjs/common'
import { OrderDto } from './dtos/order.dto'
import { ShopService } from './shop.service'
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger'
import { LoadTimeInterceptor } from '../common/interceptors/load-time.interceptor'
import { CustomerLayoutDto, LayoutDto } from '../common/dtos/layout.dto'
import { OrderResultDto } from './dtos/order-result.dto'

@UseInterceptors(LoadTimeInterceptor)
@Controller()
@ApiTags('shop')
export class ShopController {
  constructor (private readonly shopService: ShopService) { }

  @ApiOperation({
    summary: 'Visit the shop page'
  })
  @Get(['/', 'shop'])
  @Render('shop')
  async getShopPage(): Promise<CustomerLayoutDto> {
    let shopItems = await this.shopService.getShopItemsOnlyPreview()
    return {
      title: 'Магазин | Мастерская Бакулиной Татьяны в Санкт-Петербурге',
      description: 'Авторские картины, скульптуры и батики мастерской Бакулиной Татьяны в её любимом городе — Петербурге.',
      data: shopItems,
    }
  }

  @ApiOperation({
    summary: 'Visit a shop item page'
  })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'The shop item page has been loaded'
  })
  @ApiResponse({
    status: 404,
    description: 'The shop item with {id} was not found'
  })
  @Get('shop/:id')
  @Render('shop_item')
  async getShopItemPage(@Param('id') id: number): Promise<CustomerLayoutDto> {
    const shopItem = await this.shopService.getShopItem(id)
    return {
      title: shopItem.name + ' | Мастерская Бакулиной Татьяны в Санкт-Петербурге',
      description: 'Страница картины ' + shopItem.name + '.',
      data: shopItem,
    }
  }

  @ApiOperation({
    summary: 'Mail shop item order to the business e-mail'
  })
  @ApiResponse({
    status: 201,
    description: 'The shop item order has been sent'
  })
  @ApiResponse({
    status: 404,
    description: 'The shop item id is incorrect'
  })
  @Post('shop/order')
  async sendShopItemOrder(@Body() order: OrderDto): Promise<OrderResultDto> {
    try {
      await this.shopService.sendShopItemOrder(order)
      return {
        orderSuccessful: true,
      }
    } catch (err) {
      return {
        orderSuccessful: false,
        orderErrorMessage: err.message,
      }
    }
  }
}