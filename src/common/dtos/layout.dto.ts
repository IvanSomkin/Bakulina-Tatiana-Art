import { ShopItemDto } from "../../shop/dtos/shop-item.dto"
import { ShopItemsDto } from "../../shop/dtos/shop-items.dto"
import { ShopItemEntity } from "../../shop/entities/shop-item.entity"

export class LayoutDto { }

export class ShopLayoutDto extends LayoutDto {
  shopItemEntities: ShopItemEntity[]
}

export class ShopItemLayoutDto extends LayoutDto {
  shopItem: ShopItemDto
}

export class AdminLayoutDto extends LayoutDto {
  adminName: string
}

export class AdminShopLayoutDto extends LayoutDto {
  shopItemEntities: ShopItemEntity[]
  adminName: string
}

export class AdminShopItemLayoutDto extends AdminLayoutDto {
  shopItem: ShopItemDto
}

export class AdminSettingsLayoutDto extends AdminLayoutDto {
  adminUuid: string
}