import { Body, Controller, Delete, Get, NotImplementedException, Param, Post, Put, Render } from '@nestjs/common';
import { AdminService } from './administrator.service';
import { join } from 'path';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

import { ChangeShopItemDto } from './dtos/change-shop-item.dto';
import { ChangeMaterialDto } from './dtos/change-material.dto';
import { DeleteShopItemDto } from './dtos/delete-shop-item.dto';
import { DeleteMaterialDto } from './dtos/delete-material.dto';
import { AdminLoginDto } from './dtos/admin-login.dto';

@Controller('administrator')
@ApiTags('administrator')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({
    summary: 'Visit the admin login page'
  })
  @Get()
  @Render(join(__dirname, '..', '..', 'views/administrator_login'))
  getAdminLoginPage() {
    return {};
  }

  @ApiOperation({
    summary: 'Log in as admin'
  })
  @ApiResponse({
    status: 200,
    description: 'The user has logged in as admin'
  })
  @Post()
  @Render(join(__dirname, '..', '..', 'views/administrator'))
  loginAsAdmin(@Body() adminLoginDTO: AdminLoginDto) {
    throw new NotImplementedException();
  }

  @ApiOperation({
    summary: 'Add new shop item'
  })
  @ApiResponse({
    status: 200,
    description: 'The new shop item has been added'
  })
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