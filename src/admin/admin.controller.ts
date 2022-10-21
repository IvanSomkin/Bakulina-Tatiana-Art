import { Body, Controller, Delete, Get, Param, Post, Put, Render, Res, Session, UseGuards } from '@nestjs/common'
import { AdminService } from './admin.service'
import { ApiOperation, ApiResponse, ApiCookieAuth, ApiPayloadTooLargeResponse, ApiTags } from '@nestjs/swagger'

import { ChangeShopItemDto } from '../admin/dtos/change-shop-item.dto'
import { ShopService } from '../shop/shop.service'
import { AuthGuard } from '../auth/guards/auth.guard'
import { Response } from 'express'
import { SessionContainer } from 'supertokens-node/recipe/session'
import { AdminSettingsLayoutDto, AdminShopItemLayoutDto, AdminShopLayoutDto, LayoutDto } from '../common/dtos/layout.dto'

@ApiTags('admin')
@Controller()
export class AdminController {
  constructor (
    private readonly adminService: AdminService,
    private readonly shopService: ShopService,
  ) { }

  @ApiOperation({
    summary: 'Visit the admin login page'
  })
  @Render('admin_login')
  @Get('administrator/login')
  getAdminLoginPage(): LayoutDto {
    return {}
  }

  @ApiOperation({
    summary: 'Visit the admin page'
  })
  @ApiCookieAuth()
  @UseGuards(AuthGuard)
  @Render('admin_shop')
  @Get('administrator')
  async getAdminShopPage(@Session() session: SessionContainer): Promise<AdminShopLayoutDto> {
    let shopItemEntities = await this.shopService.getShopItemEntities()
    return {
      adminName: await this.adminService.getAdminName(session.getUserId()),
      shopItemEntities: shopItemEntities,
    }
  }

  @ApiOperation({
    summary: 'Visit the admin settings page'
  })
  @ApiCookieAuth()
  @UseGuards(AuthGuard)
  @Render('admin_settings')
  @Get('administrator/settings')
  async getSettingsPage(@Session() session: SessionContainer, @Res() res: Response): Promise<AdminSettingsLayoutDto> {
    return {
      adminName: await this.adminService.getAdminName(session.getUserId()),
      adminUuid: session.getUserId(),
    }
  }

  @ApiOperation({
    summary: 'Visit the shop item editor page'
  })
  @ApiCookieAuth()
  @UseGuards(AuthGuard)
  @Render('admin_shop_item')
  @Get('administrator/shop/:id')
  async getAdminShopItemPage(
    @Session() session: SessionContainer,
    @Param('id') id: number,
  ): Promise<AdminShopItemLayoutDto> {
    let shopItem = await this.shopService.getShopItem(id)
    return {
      adminName: await this.adminService.getAdminName(session.getUserId()),
      shopItem: shopItem,
    }
  }
}

/*
@Controller()
export class AdminShopItemController {
  constructor(
    private readonly adminService: AdminService,
  ) { }

  @ApiOperation({
    summary: 'Create new shop item'
  })
  @ApiResponse({
    status: 200,
    description: 'The new shop item has been added'
  })
  @ApiCookieAuth()
  @UseGuards(AuthGuard)
  @Post('administrator/shop/new')
  async createShopItem(): Promise<CreateShopItemResponseDto> {
    const itemId = await this.adminService.createShopItem()
    return {
      createdItemId: itemId,
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
  @UseGuards(AuthGuard)
  @Delete('shop/:id')
  async removeShopItem(@Param('id') id: number, @Res() res: Response) {
    await this.adminService.removeShopItem({ shopItemId: id })
    return res.redirect('/administrator')
  }

  @ApiOperation({
    summary: 'Update shop item information'
  })
  @ApiResponse({
    status: 200,
    description: 'The shop item information has been updated'
  })
  @ApiCookieAuth()
  @UseGuards(AuthGuard)
  @Put('shop/:id')
  async changeShopItem(@Body() changeShopItem: ChangeShopItemDto) {
    await this.adminService.changeShopItem(changeShopItem)
  }
}
*/