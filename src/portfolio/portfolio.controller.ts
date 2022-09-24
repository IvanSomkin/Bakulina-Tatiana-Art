import { Controller, Get, Render } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { join } from 'path';

@Controller()
@ApiTags('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}
  
  @ApiOperation({
    summary: 'Visit the portfolio page'
  })
  @Get('portfolio')
  @Render(join(__dirname, '..', '..', 'views/portfolio'))
  getPortfolioPage() {
    return {};
  }
}
