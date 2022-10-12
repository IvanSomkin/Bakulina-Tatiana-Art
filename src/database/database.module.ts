import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopItem } from '../shop/entities/shop-item.entity';
import { FrameOption } from '../shop/entities/frame-option.entity';
import { HelperModule } from '../helper/helper.module';
import { HelperService } from '../helper/helper.service';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
 
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
        entities: [ShopItem],
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
export class DatabaseModule {}