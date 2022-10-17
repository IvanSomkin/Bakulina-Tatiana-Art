import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopItemEntity } from '../shop/entities/shop-item.entity';
import { HelperModule } from '../helper/helper.module';
import { HelperService } from '../helper/helper.service';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Admin } from '../admin/entities/admin.entity';
import { ShopItemImageEntity } from '../shop/entities/shop-item-image.entity';
import { ImageEntity } from '../common/entities/image.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [HelperModule],
      inject: [HelperService],
      useFactory: (helperService: HelperService) => ({
        type: 'postgres',
        host: helperService.getDbHost(),
        port: helperService.getDbPort(),
        username: helperService.getDbUsername(),
        password: helperService.getDbPassword(),
        database: helperService.getDbName(),
        entities: [ShopItemEntity, ShopItemImageEntity, ImageEntity, Admin],
        namingStrategy: new SnakeNamingStrategy(),
        synchronize: true,
        extra: {
          ssl: {
            rejectUnauthorized: false
          }
        }
      })
    })
  ]
})
export class DatabaseModule { }