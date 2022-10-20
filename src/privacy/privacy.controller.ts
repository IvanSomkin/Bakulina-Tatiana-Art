import { Controller, Get, Render, UseInterceptors } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'
import { CustomerLayoutDto } from '../common/dtos/layout.dto'
import { LoadTimeInterceptor } from '../common/interceptors/load-time.interceptor'

@Controller('privacy')
export class PrivacyController {
  constructor () { }

  @ApiOperation({
    summary: 'Visit the privacy information page'
  })
  @UseInterceptors(LoadTimeInterceptor)
  @Get()
  @Render('privacy')
  async getPrivacyPage(): Promise<CustomerLayoutDto> {
    return {
      title: 'Конфиденциальность | Мастерская Бакулиной Татьяны в Санкт-Петербурге',
      description: 'Страница политики конфиденциальности.',
    }
  }
}
