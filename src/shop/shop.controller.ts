import { Body, Controller, Get, Param, Res, Render, Post, Redirect, UseInterceptors, NotFoundException, UseFilters, HttpException } from '@nestjs/common'
import { OrderDto } from './dtos/order.dto'
import { ShopService } from './shop.service'
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger'
import { LoadTimeInterceptor } from '../common/interceptors/load-time.interceptor'
import { ShopItemLayoutDto, ShopLayoutDto } from '../common/dtos/layout.dto'
import { OrderResultDto } from './dtos/order-result.dto'

@ApiTags('shop')
@UseInterceptors(LoadTimeInterceptor)
@Controller()
export class ShopController {
  constructor (private readonly shopService: ShopService) { }

  @ApiOperation({
    summary: 'Visit the shop page'
  })
  @Get(['/', 'shop'])
  @Render('shop')
  async getShopPage(): Promise<ShopLayoutDto> {
    let shopItemEntities = await this.shopService.getShopItemEntities()
    return {
      shopItemEntities: shopItemEntities,
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
  async getShopItemPage(@Param('id') id: number): Promise<ShopItemLayoutDto> {
    const shopItem = await this.shopService.getShopItem(id)
    return {
      shopItem: shopItem,
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
    status: 500,
    description: 'Internal server error was encountered.'
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