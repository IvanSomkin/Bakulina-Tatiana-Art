import { Controller, Get, Render } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CustomerLayoutDto } from 'src/common/dtos/layout.dto';

@Controller()
@ApiTags('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}
  
  @ApiOperation({
    summary: 'Visit the portfolio page'
  })
  @Get('portfolio')
  @Render('portfolio')
  getPortfolioPage(): CustomerLayoutDto {
    return {
      title: 'Портфолио | Мастерская Бакулиной Татьяны в Санкт-Петербурге',
      description: 'Представляю вам примеры моих работ. От мира природы до модерна и абстракции - всё входит в мои творческие и жизненные интересы.',
    };
  }
}
