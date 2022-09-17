import { Controller, Get, Param, Render } from '@nestjs/common';
import { ShopService } from './shop.service';
import { join } from 'path';


@Controller()
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Get(['/', 'shop'])
  @Render(join(__dirname, '..', '..', 'views/shop'))
  async getShopPage() {
    return await this.shopService.getShopPage();
  }

  @Get('item/:id')
  @Render(join(__dirname, '..', '..', 'views/shop_item'))
  async getItemPage(@Param('id') id : string) {
    return await this.shopService.getItemPage(id);
  }
}