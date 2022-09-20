import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './administrator.controller';
import { AdminService } from './administrator.service';
import { Administrator } from './entities/administator.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Administrator])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}