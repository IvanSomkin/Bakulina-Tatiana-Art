import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShopItemsDto } from '../shop/dtos/shop-items.dto';
import { ShopItem } from '../shop/entities/shop-item.entity';
import { Repository } from 'typeorm';
import { ShopItemDto } from '../shop/dtos/shop-item.dto';
import { readdir } from 'node:fs/promises';
import { ShopService } from '../shop/shop.service';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(ShopItem)
    private shopItemRepository: Repository<ShopItem>,
    private shopService: ShopService
  ) { }
}

