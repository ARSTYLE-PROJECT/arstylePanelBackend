import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { QuotedServicesService } from './quoted-services.service';
import { CreateQuotedServiceDto } from './dto/create-quoted-service.dto';
import { UpdateQuotedServiceDto } from './dto/update-quoted-service.dto';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { createQuotedServiceSchema } from './dto/create-quoted-service.dto';
import { updateQuotedServiceSchema } from './dto/update-quoted-service.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('quoted-services')
@Controller('quoted-services')
export class QuotedServicesController {
  constructor(private readonly quotedServicesService: QuotedServicesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new quoted service' })
  @ApiBody({ type: CreateQuotedServiceDto })
  @ApiResponse({
    status: 201,
    description: 'The quoted service has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(
    @Body(new ZodValidationPipe(createQuotedServiceSchema))
    createQuotedServiceDto: CreateQuotedServiceDto,
  ) {
    return this.quotedServicesService.create(createQuotedServiceDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all quoted services' })
  @ApiResponse({ status: 200, description: 'Return all quoted services.' })
  findAll() {
    return this.quotedServicesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a quoted service by id' })
  @ApiParam({ name: 'id', description: 'Quoted service ID', type: 'number' })
  @ApiResponse({ status: 200, description: 'Return the quoted service.' })
  @ApiResponse({ status: 404, description: 'Quoted service not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.quotedServicesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a quoted service' })
  @ApiParam({ name: 'id', description: 'Quoted service ID', type: 'number' })
  @ApiBody({ type: UpdateQuotedServiceDto })
  @ApiResponse({
    status: 200,
    description: 'The quoted service has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Quoted service not found.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateQuotedServiceSchema))
    updateQuotedServiceDto: UpdateQuotedServiceDto,
  ) {
    return this.quotedServicesService.update(id, updateQuotedServiceDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a quoted service' })
  @ApiParam({ name: 'id', description: 'Quoted service ID', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'The quoted service has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Quoted service not found.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.quotedServicesService.remove(id);
  }
}
