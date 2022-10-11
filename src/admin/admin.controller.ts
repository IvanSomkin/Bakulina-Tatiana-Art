import { Body, Controller, Delete, Get, NotImplementedException, Param, Post, Put, Render, UseFilters, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { join } from 'path';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

import { ChangeShopItemDto } from '../auth/dtos/change-shop-item.dto';
import { ChangeMaterialDto } from '../auth/dtos/change-material.dto';
import { DeleteShopItemDto } from '../auth/dtos/delete-shop-item.dto';
import { DeleteMaterialDto } from '../auth/dtos/delete-material.dto';
import { ShopService } from '../shop/shop.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Session } from '../auth/decorators/session.decorator';
import { SessionContainer } from 'supertokens-node/recipe/session';
import { symlink } from 'fs';
import { SupertokensExceptionFilter } from 'src/auth/filters/auth.filter';

@Controller('administrator')
@ApiTags('administrator')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly shopService: ShopService,
  ) {}

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
  @Get()
  @UseGuards(new AuthGuard())
  @UseFilters(new SupertokensExceptionFilter())
  @Render(join(__dirname, '..', '..', 'views/administrator'))
  async getAdminPage(@Session() session: SessionContainer) {
    var shop_items_dto = await this.shopService.getShopItems();
    return {
      shop_items: shop_items_dto.shop_items,
    };
  }

  @ApiOperation({
    summary: 'Visit the admin page'
  })
  @UseGuards(new AuthGuard())
  @Get('shop/:id')
  @Render(join(__dirname, '..', '..', 'views/administrator_shop_item'))
  async getAdminShopItemPage(@Param('id') id) {
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
  @UseGuards(new AuthGuard())
  @Post('shop/item')
  addShopItem(@Body() changeShopItem: ChangeShopItemDto) {
    throw new NotImplementedException();
  }

  @ApiOperation({
    summary: 'Delete shop item by id'
  })
  @ApiResponse({
    status: 200,
    description: 'The shop item with needed id has been deleted'
  })
  @UseGuards(new AuthGuard())
  @Delete('shop/item')
  deleteShopItem(@Body() deleteShopItem: DeleteShopItemDto) {
    throw new NotImplementedException();
  }

  @ApiOperation({
    summary: 'Update shop item information'
  })
  @ApiResponse({
    status: 200,
    description: 'The shop item information has been updated'
  })
  @UseGuards(new AuthGuard())
  @Put('shop/item')
  updateShopItem(@Body() changeShopItem: ChangeShopItemDto) {
    throw new NotImplementedException();
  }

  /*
  @Post('shop/material')
  addMaterial(@Body() changeMaterial: ChangeMaterialDto) {
    throw new NotImplementedException();
  }

  
  @Delete('shop/material')
  deleteMaterial(@Body() deleteMaterial: DeleteMaterialDto) {
    throw new NotImplementedException();
  }

  @Put('shop/material')
  updateMaterial(@Body() changeMaterial: ChangeMaterialDto) {
    throw new NotImplementedException();
  }
  */
}