import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ShopItemEntity, ShopItemStatus } from '../shop/entities/shop-item.entity'
import { Repository } from 'typeorm'
import { RemoveShopItemDto } from './dtos/remove-shop-item.dto'
import { ChangeShopItemDto } from './dtos/change-shop-item.dto'
import { Admin } from './entities/admin.entity'
import { signUp } from 'supertokens-node/lib/build/recipe/emailpassword'
import { deleteUser } from 'supertokens-node'
import { DeleteAdminDto } from './dtos/delete-admin.dto'
import { RenameAdminDto } from './dtos/rename-admin.dto'
import { SignUpAdminNameDto } from './dtos/sign-up-admin.dto'

@Injectable()
export class AdminService {
  constructor (
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

    let formData = renameAdminDto.formData

    let admin: Admin = await this.adminRepository.findOne(
      {
        where: {
          uuid: renameAdminDto.adminUuid,
        }
      }
    )
    if (admin === null) {
      admin = this.adminRepository.create({
        uuid: renameAdminDto.adminUuid
      })
    }
    let oldName = admin.name
    admin.name = formData.newName
    await this.adminRepository.save(admin)
    return {
      oldName: oldName,
      newName: formData.newName,
    }
  }

  async signUpAdmin(signUpAdminNameDto: SignUpAdminNameDto) {

    let formData = signUpAdminNameDto.formData

    let signer = await this.adminRepository.findOne({
      where: {
        uuid: signUpAdminNameDto.signerUuid
      },
    })

    let stResult = await signUp(
      formData.signedEmail,
      formData.signedPassword,
    )

    if (stResult.status == "OK") {
      await this.adminRepository.insert({
        uuid: stResult.user.id,
        name: formData.signedName,
      })
      return {
        signerName: signer.name,
        signedName: formData.signedName,
      }
    } else {
      return undefined
    }
  }

  async deleteAdmin(deleteAdminDto: DeleteAdminDto) {

    let formData = deleteAdminDto.formData

    let deleter = await this.adminRepository.findOne({
      where: {
        uuid: deleteAdminDto.deleterUuid,
      }
    })

    let deleted = await this.adminRepository.findOne({
      where: {
        uuid: formData.deletedUuid,
      }
    })


    let stResult = await deleteUser(formData.deletedUuid)

    if (deleted == null) {
      return undefined
    }

    if (stResult.status == "OK") {
      let deleteResult = await this.adminRepository.delete({
        uuid: deleted.uuid
      })

      console.log(deleteResult.raw)

      return {
        deleterName: deleter.name,
        deletedName: deleted.name,
      }
    } else {
      return undefined
    }
  }

  async createShopItem(): Promise<number> {
    let newItem: ShopItemEntity = this.shopItemRepository.create()
    const maxShopPosition = await this.shopItemRepository
      .createQueryBuilder("shop_item")
      .select("MAX(shop_item.position)", "max")
      .getRawOne()
    newItem.position = maxShopPosition + 1
    newItem.status = ShopItemStatus.CREATED
    this.shopItemRepository.save(newItem)
    return newItem.id
  }

  async removeShopItem(removeShopItemDto: RemoveShopItemDto) {
    const itemId = removeShopItemDto.shopItemId
    let item = await this.shopItemRepository.findOne(
      {
        where: {
          id: itemId
        }
      }
    )
    item.status = ShopItemStatus.REMOVED
    this.shopItemRepository.save(item)
    this.shopItemRepository.softDelete(itemId)
  }

  async changeShopItem(changeShopItemDto: ChangeShopItemDto) {
    const item: ShopItemEntity = changeShopItemDto.shopItem
    this.shopItemRepository.save(item)
  }
}

