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
import { StockSuppliersService } from './stock-suppliers.service';
import { CreateStockSupplierDto } from './dto/create-stock-supplier.dto';
import { UpdateStockSupplierDto } from './dto/update-stock-supplier.dto';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { createStockSupplierSchema } from './dto/create-stock-supplier.dto';
import { updateStockSupplierSchema } from './dto/update-stock-supplier.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('stock-suppliers')
@Controller('stock-suppliers')
export class StockSuppliersController {
  constructor(private readonly stockSuppliersService: StockSuppliersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new stock supplier' })
  @ApiBody({ type: CreateStockSupplierDto })
  @ApiResponse({
    status: 201,
    description: 'The stock supplier has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(
    @Body(new ZodValidationPipe(createStockSupplierSchema))
    createStockSupplierDto: CreateStockSupplierDto,
  ) {
    return this.stockSuppliersService.create(createStockSupplierDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all stock suppliers' })
  @ApiResponse({ status: 200, description: 'Return all stock suppliers.' })
  findAll() {
    return this.stockSuppliersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a stock supplier by id' })
  @ApiParam({ name: 'id', description: 'Stock supplier ID', type: 'number' })
  @ApiResponse({ status: 200, description: 'Return the stock supplier.' })
  @ApiResponse({ status: 404, description: 'Stock supplier not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.stockSuppliersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a stock supplier' })
  @ApiParam({ name: 'id', description: 'Stock supplier ID', type: 'number' })
  @ApiBody({ type: UpdateStockSupplierDto })
  @ApiResponse({
    status: 200,
    description: 'The stock supplier has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Stock supplier not found.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateStockSupplierSchema))
    updateStockSupplierDto: UpdateStockSupplierDto,
  ) {
    return this.stockSuppliersService.update(id, updateStockSupplierDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a stock supplier' })
  @ApiParam({ name: 'id', description: 'Stock supplier ID', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'The stock supplier has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Stock supplier not found.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.stockSuppliersService.remove(id);
  }
}
