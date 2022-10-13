import { Controller, Get, Render, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation } from '@nestjs/swagger';
import { CustomerLayoutDto } from './common/dtos/layout.dto';
import { LoadTimeInterceptor } from './common/interceptors/load-time.interceptor';


@Controller()
export class AppController {
  constructor() {}

  @ApiOperation({
    summary: 'Visit the privacy information page'
  })
  @UseInterceptors(LoadTimeInterceptor)
  @Get('privacy')
  @Render('privacy')
  async getPrivacyPage() : Promise<CustomerLayoutDto> {
    return {
      title: 'Конфиденциальность | Мастерская Бакулиной Татьяны в Санкт-Петербурге',
      description: 'Страница политики конфиденциальности.',
    };
  }
}