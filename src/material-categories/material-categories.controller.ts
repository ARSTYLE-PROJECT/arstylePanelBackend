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
import { MaterialCategoriesService } from './material-categories.service';
import { CreateMaterialCategoryDto } from './dto/create-material-category.dto';
import { UpdateMaterialCategoryDto } from './dto/update-material-category.dto';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { createMaterialCategorySchema } from './dto/create-material-category.dto';
import { updateMaterialCategorySchema } from './dto/update-material-category.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('material-categories')
@Controller('material-categories')
export class MaterialCategoriesController {
  constructor(
    private readonly materialCategoriesService: MaterialCategoriesService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new material category' })
  @ApiBody({ type: CreateMaterialCategoryDto })
  @ApiResponse({
    status: 201,
    description: 'The material category has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(
    @Body(new ZodValidationPipe(createMaterialCategorySchema))
    createMaterialCategoryDto: CreateMaterialCategoryDto,
  ) {
    return this.materialCategoriesService.create(createMaterialCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all material categories' })
  @ApiResponse({ status: 200, description: 'Return all material categories.' })
  findAll() {
    return this.materialCategoriesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a material category by id' })
  @ApiParam({ name: 'id', description: 'Material category ID', type: 'number' })
  @ApiResponse({ status: 200, description: 'Return the material category.' })
  @ApiResponse({ status: 404, description: 'Material category not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.materialCategoriesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a material category' })
  @ApiParam({ name: 'id', description: 'Material category ID', type: 'number' })
  @ApiBody({ type: UpdateMaterialCategoryDto })
  @ApiResponse({
    status: 200,
    description: 'The material category has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Material category not found.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateMaterialCategorySchema))
    updateMaterialCategoryDto: UpdateMaterialCategoryDto,
  ) {
    return this.materialCategoriesService.update(id, updateMaterialCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a material category' })
  @ApiParam({ name: 'id', description: 'Material category ID', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'The material category has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Material category not found.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.materialCategoriesService.remove(id);
  }
}
