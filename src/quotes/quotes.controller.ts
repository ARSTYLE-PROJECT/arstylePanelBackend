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
import { QuotesService } from './quotes.service';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { createQuoteSchema } from './dto/create-quote.dto';
import { updateQuoteSchema } from './dto/update-quote.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Quotes')
@Controller('quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new quote' })
  @ApiBody({ type: CreateQuoteDto })
  @ApiResponse({
    status: 201,
    description: 'The quote has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(
    @Body(new ZodValidationPipe(createQuoteSchema))
    createQuoteDto: CreateQuoteDto,
  ) {
    return this.quotesService.create(createQuoteDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all quotes' })
  @ApiResponse({ status: 200, description: 'Return all quotes.' })
  findAll() {
    return this.quotesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a quote by id' })
  @ApiParam({ name: 'id', description: 'Quote ID', type: 'number' })
  @ApiResponse({ status: 200, description: 'Return the quote.' })
  @ApiResponse({ status: 404, description: 'Quote not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.quotesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a quote' })
  @ApiParam({ name: 'id', description: 'Quote ID', type: 'number' })
  @ApiBody({ type: UpdateQuoteDto })
  @ApiResponse({
    status: 200,
    description: 'The quote has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Quote not found.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateQuoteSchema))
    updateQuoteDto: UpdateQuoteDto,
  ) {
    return this.quotesService.update(id, updateQuoteDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a quote' })
  @ApiParam({ name: 'id', description: 'Quote ID', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'The quote has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Quote not found.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.quotesService.remove(id);
  }
}
