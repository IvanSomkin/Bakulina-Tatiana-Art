import { Controller, Get, Render } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { join } from 'path'

@Controller()
@ApiTags('contacts')
export class ContactsController {
  @ApiOperation({
    summary: 'Visit the contacts page'
  })
  @Get('contacts')
  @Render(join(__dirname, '..', '..', 'views/contacts'))
  getContactsPage() {
    return {};
  }
}
