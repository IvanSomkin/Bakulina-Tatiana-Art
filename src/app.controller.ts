import { Controller, Get, Render, UseInterceptors } from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { LayoutDto } from './common/dtos/layout.dto'
import { LoadTimeInterceptor } from './common/interceptors/load-time.interceptor'

@ApiTags('contacts')
@UseInterceptors(LoadTimeInterceptor)
@Controller('contacts')
export class ContactsController {

  @ApiOperation({
    summary: 'Visit the contacts page'
  })

  @Get()
  @Render('contacts')

  getContactsPage(): LayoutDto {
    return {}
  }

}

@ApiTags('privacy')
@Controller('privacy')
export class PrivacyController {

  @ApiOperation({
    summary: 'Visit the privacy information page'
  })
  @Get()
  @Render('privacy')

  getPrivacyPage(): LayoutDto {
    return {}
  }

}
