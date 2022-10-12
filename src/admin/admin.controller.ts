import { Body, Controller, Delete, Get, Param, Post, Put, Render, Res, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { AdminService } from './admin.service';
import { join } from 'path';
import { ApiTags, ApiOperation, ApiResponse, ApiCookieAuth } from '@nestjs/swagger';

import { ChangeShopItemDto } from '../admin/dtos/change-shop-item.dto';
import { ShopService } from '../shop/shop.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CreateShopItemResponseDto } from './dtos/create-shop-item-response.dto';
import { Response } from 'express';

@Controller('administrator')
@ApiTags('administrator')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly shopService: ShopService,
  ) { }

  @ApiOperation({
    summary: 'Visit the admin login page'
  })
  @Get('login')
  @Render(join(__dirname, '..', '..', 'views/administrator_login'))
  getAdminLoginPage() {
    return {};
  }

  @ApiOperation({
    summary: 'Visit the admin page'
  })
  @ApiCookieAuth()
  @Get()
  @UseGuards(new AuthGuard())
  @Render(join(__dirname, '..', '..', 'views/administrator'))
  async getAdminPage() {
    var shop_items_dto = await this.shopService.getShopItems();
    return {
      shop_items: shop_items_dto.shop_items,
    };
  }

  @ApiOperation({
    summary: 'Visit the shop item editor page'
  })
  @ApiCookieAuth()
  @UseGuards(new AuthGuard())
  @Get('shop/:id')
  @Render(join(__dirname, '..', '..', 'views/administrator_shop_item'))
  async getAdminShopItemPage(@Param('id') id: number) {
    var shop_item_dto = await this.shopService.getShopItem(id);
    return shop_item_dto;
  }

  @ApiOperation({
    summary: 'Add new shop item'
  })
  @ApiResponse({
    status: 200,
    description: 'The new shop item has been added'
  })
  @ApiCookieAuth()
  @UseGuards(new AuthGuard())
  @Post('shop/item')
  async createShopItem(): Promise<CreateShopItemResponseDto> {
    const item_id = await this.adminService.createShopItem();
    return {
      created_shop_item_id: item_id,
    }
  }

  @ApiOperation({
    summary: 'Delete shop item by id'
  })
  @ApiResponse({
    status: 200,
    description: 'The shop item with needed id has been deleted'
  })
  @ApiCookieAuth()
  @UseGuards(new AuthGuard())
  @Delete('shop/:id')
  async removeShopItem(@Param('id') id: number, @Res() res: Response) {
    await this.adminService.removeShopItem({ shop_item_id: id });
    return res.redirect('/administrator');
  }

  @ApiOperation({
    summary: 'Update shop item information'
  })
  @ApiResponse({
    status: 200,
    description: 'The shop item information has been updated'
  })
  @ApiCookieAuth()
  @UseGuards(new AuthGuard())
  @Put('shop/:id')
  async changeShopItem(@Body() changeShopItem: ChangeShopItemDto) {
    await this.adminService.changeShopItem(changeShopItem);
  }
}