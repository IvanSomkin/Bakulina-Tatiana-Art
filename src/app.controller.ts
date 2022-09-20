import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { join } from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('contacts')
  @Render(join(__dirname, '..', 'views/contacts'))
  getContactsPage() {}

  @Get('privacy')
  @Render(join(__dirname, '..', 'views/privacy'))
  getPrivacyPage() {}
}