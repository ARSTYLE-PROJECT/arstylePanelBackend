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
import { ChargesService } from './charges.service';
import { CreateChargeDto } from './dto/create-charge.dto';
import { UpdateChargeDto } from './dto/update-charge.dto';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { createChargeSchema } from './dto/create-charge.dto';
import { updateChargeSchema } from './dto/update-charge.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('charges')
@Controller('charges')
export class ChargesController {
  constructor(private readonly chargesService: ChargesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new charge' })
  @ApiBody({ type: CreateChargeDto })
  @ApiResponse({
    status: 201,
    description: 'The charge has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(
    @Body(new ZodValidationPipe(createChargeSchema))
    createChargeDto: CreateChargeDto,
  ) {
    return this.chargesService.create(createChargeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all charges' })
  @ApiResponse({ status: 200, description: 'Return all charges.' })
  findAll() {
    return this.chargesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a charge by id' })
  @ApiParam({ name: 'id', description: 'Charge ID', type: 'number' })
  @ApiResponse({ status: 200, description: 'Return the charge.' })
  @ApiResponse({ status: 404, description: 'Charge not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.chargesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a charge' })
  @ApiParam({ name: 'id', description: 'Charge ID', type: 'number' })
  @ApiBody({ type: UpdateChargeDto })
  @ApiResponse({
    status: 200,
    description: 'The charge has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Charge not found.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateChargeSchema))
    updateChargeDto: UpdateChargeDto,
  ) {
    return this.chargesService.update(id, updateChargeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a charge' })
  @ApiParam({ name: 'id', description: 'Charge ID', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'The charge has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Charge not found.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.chargesService.remove(id);
  }
}
