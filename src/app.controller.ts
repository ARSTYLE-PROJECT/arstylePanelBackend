import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Get welcome message' })
  @ApiResponse({
    status: 200,
    description: 'Returns a welcome message',
    schema: {
      type: 'string',
      example: 'Welcome to ArtStyle API!',
    },
  })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
