import { Body, Controller, Get, Param, Render, Post, Redirect } from '@nestjs/common';
import { OrderDto } from './dtos/order.dto';
import { ShopService } from './shop.service';
import { join } from 'path';

//@UseInterceptors(LoggingInterceptor)
@Controller()
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  
  @Get(['/', 'shop'])
  @Render(join(__dirname, '..', '..', 'views/shop'))
  async getShopPage() {
    var shop_items = await this.shopService.getShopPage();
    return shop_items
  }

  @Get('item/:id')
  @Render(join(__dirname, '..', '..', 'views/shop_item'))
  async getItemPage(@Param('id') id: number) {
    return await this.shopService.getItemPage(id);
  }

  @Post('item/:id/order')
  @Redirect('item/:id')
  @Render(join(__dirname, '..', '..', 'views/shop_item'))
  async sendItemOrder(@Body() order: OrderDto) {
    return await this.shopService.sendItemOrder(order)
  }
}