import { Controller, Get, Render } from '@nestjs/common'
import { PortfolioService } from './portfolio.service'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { LayoutDto } from '../common/dtos/layout.dto'

@Controller()
export class PortfolioController {
  constructor (private readonly portfolioService: PortfolioService) { }

  @Get('portfolio')
  @Render('portfolio')
  getPortfolioPage(): LayoutDto {
    return {}
  }

}
