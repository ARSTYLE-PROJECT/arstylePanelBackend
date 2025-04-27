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
import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { createInvoiceSchema } from './dto/create-invoice.dto';
import { updateInvoiceSchema } from './dto/update-invoice.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Invoices')
@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new invoice' })
  @ApiBody({ type: CreateInvoiceDto })
  @ApiResponse({
    status: 201,
    description: 'The invoice has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(
    @Body(new ZodValidationPipe(createInvoiceSchema))
    createInvoiceDto: CreateInvoiceDto,
  ) {
    return this.invoicesService.create(createInvoiceDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all invoices' })
  @ApiResponse({ status: 200, description: 'Return all invoices.' })
  findAll() {
    return this.invoicesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an invoice by id' })
  @ApiParam({ name: 'id', description: 'Invoice ID', type: 'number' })
  @ApiResponse({ status: 200, description: 'Return the invoice.' })
  @ApiResponse({ status: 404, description: 'Invoice not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.invoicesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an invoice' })
  @ApiParam({ name: 'id', description: 'Invoice ID', type: 'number' })
  @ApiBody({ type: UpdateInvoiceDto })
  @ApiResponse({
    status: 200,
    description: 'The invoice has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Invoice not found.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateInvoiceSchema))
    updateInvoiceDto: UpdateInvoiceDto,
  ) {
    return this.invoicesService.update(id, updateInvoiceDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an invoice' })
  @ApiParam({ name: 'id', description: 'Invoice ID', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'The invoice has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Invoice not found.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.invoicesService.remove(id);
  }
}
