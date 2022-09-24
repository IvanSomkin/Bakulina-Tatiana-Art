import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { join } from 'path';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({
    summary: 'Visit the privacy information page'
  })
  @Get('privacy')
  @Render(join(__dirname, '..', 'views/privacy'))
  getPrivacyPage() {
    return {};
  }
}