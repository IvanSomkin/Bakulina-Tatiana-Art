import { Controller, Get, Render } from '@nestjs/common';
import { join } from 'path'

@Controller()
export class ContactsController {
  @Get('contacts')
  @Render(join(__dirname, '..', '..', 'views/contacts'))
  getContactsPage() {
    return {};
  }
}
