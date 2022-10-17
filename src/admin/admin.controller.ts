import { Body, Controller, Delete, Get, Param, Post, Put, Res, Session, UseGuards } from '@nestjs/common'
import { AdminService } from './admin.service'
import { ApiOperation, ApiResponse, ApiCookieAuth } from '@nestjs/swagger'

import { ChangeShopItemDto } from '../admin/dtos/change-shop-item.dto'
import { ShopService } from '../shop/shop.service'
import { AuthGuard } from '../auth/guards/auth.guard'
import { CreateShopItemResponseDto } from './dtos/create-shop-item-response.dto'
import { Response } from 'express'
import { SessionContainer } from 'supertokens-node/recipe/session'

@Controller()
export class AdminPageController {
  constructor(
    private readonly adminService: AdminService,
    private readonly shopService: ShopService,
  ) { }

  @ApiOperation({
    summary: 'Visit the admin login page'
  })
  @Get('administrator/login')
  getLoginPage(@Res() res: Response): void {
    return res.render('admin_login', {
      layout: 'admin',
      title: 'Вход администратора | Мастерская Бакулиной Татьяны в Санкт-Петербурге',
      description: 'Страница входа в панель администратора.',
      data: '',
    })
  }

  @ApiOperation({
    summary: 'Visit the admin page'
  })
  @ApiCookieAuth()
  @UseGuards(AuthGuard)
  @Get('administrator')
  async getMainPage(@Session() session: SessionContainer, @Res() res: Response): Promise<void> {
    let shop_items = await this.shopService.getShopItemsOnlyPreview()
    return res.render('admin', {
      layout: 'admin',
      title: 'Администратор | Мастерская Бакулиной Татьяны в Санкт-Петербурге',
      description: 'Страница панели администратора.',
      data: shop_items,
      admin_name: await this.adminService.getAdminName(session.getUserId()),
    })
  }

  @ApiOperation({
    summary: 'Visit the admin user page'
  })
  @ApiCookieAuth()
  @UseGuards(AuthGuard)
  @Get('administrator/personal')
  async getPersonalPage(@Session() session: SessionContainer, @Res() res: Response): Promise<void> {
    return res.render('admin_personal', {
      layout: 'admin',
      title: 'Администратор | Мастерская Бакулиной Татьяны в Санкт-Петербурге',
      description: 'Страница личного кабинета администратора.',
      admin_name: await this.adminService.getAdminName(session.getUserId()),
      admin_uuid: session.getUserId(),
    })
  }

  @ApiOperation({
    summary: 'Visit the shop item editor page'
  })
  @ApiCookieAuth()
  @UseGuards(AuthGuard)
  @Get('administrator/shop/:id')
  async getShopItemPage(@Session() session: SessionContainer, @Param('id') id: number, @Res() res: Response) {
    let shop_item_dto = await this.shopService.getShopItem(id)

    return res.render('admin_shop_item', {
      layout: 'admin',
      title: 'Редактирование (' + shop_item_dto.name + ') | Мастерская Бакулиной Татьяны в Санкт-Петербурге',
      description: 'Страница редактирования работы ' + shop_item_dto.name + '.',
      data: shop_item_dto,
      admin_name: await this.adminService.getAdminName(session.getUserId()),
    })
  }
}



@Controller()
export class AdminPersonalController {
  constructor(
    private readonly adminService: AdminService,
  ) { }
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
    const item_id = await this.adminService.createShopItem()
    return {
      created_item_id: item_id,
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
    await this.adminService.removeShopItem({ shop_item_id: id })
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