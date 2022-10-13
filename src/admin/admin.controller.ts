import { Body, Controller, Delete, Get, Param, Post, Put, Render, Res, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { AdminService } from './admin.service';
import { join } from 'path';
import { ApiTags, ApiOperation, ApiResponse, ApiCookieAuth } from '@nestjs/swagger';

import { ChangeShopItemDto } from '../admin/dtos/change-shop-item.dto';
import { ShopService } from '../shop/shop.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CreateShopItemResponseDto } from './dtos/create-shop-item-response.dto';
import { Response } from 'express';
import { AdminLayoutDto } from 'src/common/dtos/layout.dto';
import { appendFile } from 'fs';

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
  getAdminLoginPage(@Res() res: Response): void {
    return res.render('admin_login', {
      layout: 'admin',
      title: 'Вход администратора | Мастерская Бакулиной Татьяны в Санкт-Петербурге',
      description: 'Страница входа в панель администратора.',
      data: '',
    });
  }

  @ApiOperation({
    summary: 'Visit the admin page'
  })
  @ApiCookieAuth()
  @UseGuards(new AuthGuard())
  @Get()
  async getAdminPage(@Res() res: Response): Promise<void> {
    var shop_items = await this.shopService.getShopItems();
    return res.render('admin', {
      layout: 'admin',
      title: 'Администратор | Мастерская Бакулиной Татьяны в Санкт-Петербурге',
      description: 'Страница панели администратора.',
      data: shop_items,
    });
  }

  @ApiOperation({
    summary: 'Visit the shop item editor page'
  })
  @ApiCookieAuth()
  @UseGuards(new AuthGuard())
  @Get('shop/:id')
  async getAdminShopItemPage(@Param('id') id: number, @Res() res: Response) {
    var shop_item_dto = await this.shopService.getShopItem(id);

    return res.render('admin_shop_item', {
      layout: 'admin',
      title: 'Редактирование (' + shop_item_dto.name + ') | Мастерская Бакулиной Татьяны в Санкт-Петербурге',
      description: 'Страница редактирования работы ' + shop_item_dto.name + '.',
      data: shop_item_dto,
    });
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