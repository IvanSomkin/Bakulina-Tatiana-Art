import { Body, Controller, Get, Param, Res, Render, Post, Redirect, UseInterceptors, NotFoundException, UseFilters } from '@nestjs/common';
import { OrderDto } from './dtos/order.dto';
import { ShopService } from './shop.service';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { LoadTimeInterceptor } from '../common/interceptors/load-time.interceptor'
import { CustomerLayoutDto, LayoutDto } from 'src/common/dtos/layout.dto';

@UseInterceptors(LoadTimeInterceptor)
@Controller()
@ApiTags('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) { }

  @ApiOperation({
    summary: 'Visit the shop page'
  })
  @Get(['/', 'shop'])
  @Render('shop')
  async getShopPage(): Promise<CustomerLayoutDto> {
    var shop_items = await this.shopService.getShopItems();
    return {
      title: 'Магазин | Мастерская Бакулиной Татьяны в Санкт-Петербурге',
      description: 'Авторские картины, скульптуры и батики мастерской Бакулиной Татьяны в её любимом городе — Петербурге.',
      data: shop_items,
    };
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
    const shop_item = await this.shopService.getShopItem(id);
    return {
      title: shop_item.name + ' | Мастерская Бакулиной Татьяны в Санкт-Петербурге',
      description: 'Страница картины ' + shop_item.name + '.',
      data: shop_item,
    };
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