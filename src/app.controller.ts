import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

console.log(process.env.PORT);

@Controller('api/v1/app')
@ApiTags('app')
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  get() {
    return this.appService.create();
  }
}
