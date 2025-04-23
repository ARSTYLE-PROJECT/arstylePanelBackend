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
import { RatesService } from './rates.service';
import { CreateRateDto } from './dto/create-rate.dto';
import { UpdateRateDto } from './dto/update-rate.dto';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { createRateSchema } from './dto/create-rate.dto';
import { updateRateSchema } from './dto/update-rate.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('rates')
@Controller('rates')
export class RatesController {
  constructor(private readonly ratesService: RatesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new rate' })
  @ApiBody({ type: CreateRateDto })
  @ApiResponse({
    status: 201,
    description: 'The rate has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(
    @Body(new ZodValidationPipe(createRateSchema))
    createRateDto: CreateRateDto,
  ) {
    return this.ratesService.create(createRateDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all rates' })
  @ApiResponse({ status: 200, description: 'Return all rates.' })
  findAll() {
    return this.ratesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a rate by id' })
  @ApiParam({ name: 'id', description: 'Rate ID', type: 'number' })
  @ApiResponse({ status: 200, description: 'Return the rate.' })
  @ApiResponse({ status: 404, description: 'Rate not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ratesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a rate' })
  @ApiParam({ name: 'id', description: 'Rate ID', type: 'number' })
  @ApiBody({ type: UpdateRateDto })
  @ApiResponse({
    status: 200,
    description: 'The rate has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Rate not found.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateRateSchema))
    updateRateDto: UpdateRateDto,
  ) {
    return this.ratesService.update(id, updateRateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a rate' })
  @ApiParam({ name: 'id', description: 'Rate ID', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'The rate has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Rate not found.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ratesService.remove(id);
  }
}
