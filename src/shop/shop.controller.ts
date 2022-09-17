import { Controller, Get, Param, Render, Res, UseInterceptors } from '@nestjs/common';
import { LoggingInterceptor } from '../logging/logging.interceptor'
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
  async getItemPage(@Param('id') id : string) {
    return await this.shopService.getItemPage(id);
  }
}