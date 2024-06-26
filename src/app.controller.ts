import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('podcasts')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('search')
  searchItunes(@Query('search') term: string) {
    return this.appService.searchItunes(term)
  }

  @Get('id')
  searchForEpisodes(@Query('id') id: string) {
    return this.appService.searchForEpisodes(id)
  }

  
}
