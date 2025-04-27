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
import { MaterialsService } from './materials.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { createMaterialSchema } from './dto/create-material.dto';
import { updateMaterialSchema } from './dto/update-material.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Materials')
@Controller('materials')
export class MaterialsController {
  constructor(private readonly materialsService: MaterialsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new material' })
  @ApiBody({ type: CreateMaterialDto })
  @ApiResponse({
    status: 201,
    description: 'The material has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(
    @Body(new ZodValidationPipe(createMaterialSchema))
    createMaterialDto: CreateMaterialDto,
  ) {
    return this.materialsService.create(createMaterialDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all materials' })
  @ApiResponse({ status: 200, description: 'Return all materials.' })
  findAll() {
    return this.materialsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a material by id' })
  @ApiParam({ name: 'id', description: 'Material ID', type: 'number' })
  @ApiResponse({ status: 200, description: 'Return the material.' })
  @ApiResponse({ status: 404, description: 'Material not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.materialsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a material' })
  @ApiParam({ name: 'id', description: 'Material ID', type: 'number' })
  @ApiBody({ type: UpdateMaterialDto })
  @ApiResponse({
    status: 200,
    description: 'The material has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Material not found.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateMaterialSchema))
    updateMaterialDto: UpdateMaterialDto,
  ) {
    return this.materialsService.update(id, updateMaterialDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a material' })
  @ApiParam({ name: 'id', description: 'Material ID', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'The material has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Material not found.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.materialsService.remove(id);
  }
}
