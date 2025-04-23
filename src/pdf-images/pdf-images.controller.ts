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
import { PdfImagesService } from './pdf-images.service';
import { CreatePdfImageDto } from './dto/create-pdf-image.dto';
import { UpdatePdfImageDto } from './dto/update-pdf-image.dto';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { createPdfImageSchema } from './dto/create-pdf-image.dto';
import { updatePdfImageSchema } from './dto/update-pdf-image.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('pdf-images')
@Controller('pdf-images')
export class PdfImagesController {
  constructor(private readonly pdfImagesService: PdfImagesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new pdf image' })
  @ApiBody({ type: CreatePdfImageDto })
  @ApiResponse({
    status: 201,
    description: 'The pdf image has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(
    @Body(new ZodValidationPipe(createPdfImageSchema))
    createPdfImageDto: CreatePdfImageDto,
  ) {
    return this.pdfImagesService.create(createPdfImageDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all pdf images' })
  @ApiResponse({ status: 200, description: 'Return all pdf images.' })
  findAll() {
    return this.pdfImagesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a pdf image by id' })
  @ApiParam({ name: 'id', description: 'Pdf image ID', type: 'number' })
  @ApiResponse({ status: 200, description: 'Return the pdf image.' })
  @ApiResponse({ status: 404, description: 'Pdf image not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.pdfImagesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a pdf image' })
  @ApiParam({ name: 'id', description: 'Pdf image ID', type: 'number' })
  @ApiBody({ type: UpdatePdfImageDto })
  @ApiResponse({
    status: 200,
    description: 'The pdf image has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Pdf image not found.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updatePdfImageSchema))
    updatePdfImageDto: UpdatePdfImageDto,
  ) {
    return this.pdfImagesService.update(id, updatePdfImageDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a pdf image' })
  @ApiParam({ name: 'id', description: 'Pdf image ID', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'The pdf image has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Pdf image not found.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.pdfImagesService.remove(id);
  }
}
