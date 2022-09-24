import { Body, Controller, Get, Param, Res, Render, Post, Redirect, UseInterceptors, NotFoundException } from '@nestjs/common';
import { OrderDto } from './dtos/order.dto';
import { ShopService } from './shop.service';
import { join } from 'path';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { ShopItemDto } from './dtos/shop-item.dto';
import { ShopItemsDto } from './dtos/shop-items.dto';

@Controller()
@ApiTags('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}
  
  @ApiOperation({
    summary: 'Visit the shop page'
  })
  @Get(['/', 'shop'])
  @Render(join(__dirname, '..', '..', 'views/shop'))
  async getShopPage(): Promise<ShopItemsDto> {
    var shop_items = await this.shopService.getShopPage();
    return shop_items;
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
  @Render(join(__dirname, '..', '..', 'views/shop_item'))
  async getShopItemPage(@Param('id') id: number, @Res() res): Promise<ShopItemDto> {
    const shop_item: ShopItemDto = await this.shopService.getShopItemPage(id)
    return shop_item;
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
  async sendShopItemOrder(@Body() order: OrderDto) {
    return await this.shopService.sendShopItemOrder(order);
  }
}