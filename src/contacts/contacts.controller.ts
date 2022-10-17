import { Controller, Get, Render, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { LoadTimeInterceptor } from '../common/interceptors/load-time.interceptor';

@Controller()
@ApiTags('contacts')
export class ContactsController {
  @ApiOperation({
    summary: 'Visit the contacts page'
  })
  @UseInterceptors(LoadTimeInterceptor)
  @Get('contacts')
  @Render('contacts')
  getContactsPage() {
    return {
      title: 'Контакты | Мастерская Бакулиной Татьяны в Санкт-Петербурге',
      description: 'Здесь вы сможете найти мои контакты.',
      footer_add_contacts: false,
    };
  }
}
