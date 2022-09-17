import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopItem } from '../shop/entities/shop-item.entity';
import { Material } from '../shop/entities/material.entity';
import { FrameOption } from '../shop/entities/frame-option.entity';
import { FrameOptionPart } from '../shop/entities/frame-option-part.entity';
import { HelperModule } from '../helper/helper.module';
import { HelperService } from '../helper/helper.service';
 
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
        entities: [ShopItem,Material,FrameOption,FrameOptionPart],
        synchronize: false,
        sslmode: 'prefer'
      })
    })
  ]
})
export class DatabaseModule {}