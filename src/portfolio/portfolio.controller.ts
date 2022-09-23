import { Controller, Get, Render } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { join } from 'path';

@Controller()
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}
  
  @Get('portfolio')
  @Render(join(__dirname, '..', '..', 'views/portfolio'))
  getPortfolioPage() {
    return {};
  }
}
