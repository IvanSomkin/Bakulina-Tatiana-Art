import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ShopItemEntity, ShopItemStatus } from '../shop/entities/shop-item.entity'
import { Repository } from 'typeorm'
import { RemoveShopItemDto } from './dtos/remove-shop-item.dto'
import { ChangeShopItemDto } from './dtos/change-shop-item.dto'
import { Admin } from './entities/admin.entity'
import { stringify } from 'querystring'
import { Response } from 'express'
import { signUp } from 'supertokens-node/lib/build/recipe/emailpassword'
import { deleteUser } from 'supertokens-node'
import { DeleteAdminDto } from './dtos/delete-admin.dto'
import { RenameAdminDto } from './dtos/rename-admin.dto'
import { SignUpAdminNameDto } from './dtos/sign-up-admin.dto'

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(ShopItemEntity)
    private shopItemRepository: Repository<ShopItemEntity>,
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) { }

  async getAdminName(uuid: string): Promise<string> {
    let admin = await this.adminRepository.findOne(
      {
        where: {
          uuid: uuid,
        }
      }
    )
    return admin ? admin.name : 'Безымянный'
  }

  async renameAdmin(renameAdminDto: RenameAdminDto) {

    let form_data = renameAdminDto.form_data

    let admin: Admin = await this.adminRepository.findOne(
      {
        where: {
          uuid: renameAdminDto.admin_uuid,
        }
      }
    )
    if (admin === null) {
      admin = this.adminRepository.create({
        uuid: renameAdminDto.admin_uuid
      })
    }
    let old_name = admin.name
    admin.name = form_data.new_name
    await this.adminRepository.save(admin)
    return {
      old_name: old_name,
      new_name: form_data.new_name,
    }
  }

  async signUpAdmin(signUpAdminNameDto: SignUpAdminNameDto) {

    let form_data = signUpAdminNameDto.form_data

    let creator = await this.adminRepository.findOne({
      where: {
        uuid: signUpAdminNameDto.creator_uuid
      }
    })

    let st_result = await signUp(
      form_data.created_email,
      form_data.created_password,
    )

    if (st_result.status == "OK") {
      let insert_result = await this.adminRepository.insert({
        uuid: st_result.user.id,
        name: form_data.created_name,
      })

      console.log(insert_result.raw)

      return {
        deleter_name: creator.name,
        deleted_name: form_data.created_email,
      }
    }
  }

  async deleteAdmin(deleteAdminDto: DeleteAdminDto) {

    let form_data = deleteAdminDto.form_data

    let deleter = await this.adminRepository.findOne({
      where: {
        uuid: deleteAdminDto.deleter_uuid,
      }
    })
    let deleted = await this.adminRepository.findOne({
      where: {
        uuid: form_data.deleted_uuid,
      }
    })

    let st_result = await deleteUser(deleted.uuid)
    if (st_result.status == "OK") {
      let delete_result = await this.adminRepository.delete({
        uuid: deleted.uuid
      })

      console.log(delete_result.raw)

      return {
        deleter_name: deleter.name,
        deleted_name: deleted.name,
      }
    }
  }

  async createShopItem(): Promise<number> {
    let new_item: ShopItemEntity = this.shopItemRepository.create()
    const max_shop_position = await this.shopItemRepository
      .createQueryBuilder("shop_item")
      .select("MAX(shop_item.shop_position)", "max")
      .getRawOne()
    new_item.shop_position = max_shop_position + 1
    new_item.status = ShopItemStatus.CREATED
    this.shopItemRepository.save(new_item)
    return new_item.shop_item_id
  }

  async removeShopItem(removeShopItemDto: RemoveShopItemDto) {
    const item_id = removeShopItemDto.shop_item_id
    let item = await this.shopItemRepository.findOne(
      {
        where: {
          shop_item_id: item_id
        }
      }
    )
    item.status = ShopItemStatus.REMOVED
    this.shopItemRepository.save(item)
    this.shopItemRepository.softDelete(item_id)
  }

  async changeShopItem(changeShopItemDto: ChangeShopItemDto) {
    const item: ShopItemEntity = changeShopItemDto.shop_item
    this.shopItemRepository.save(item)
  }
}

