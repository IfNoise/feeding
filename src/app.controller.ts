import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Получить приветственное сообщение' })
  @ApiResponse({
    status: 200,
    description: 'Возвращает приветственное сообщение',
    type: String,
  })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
