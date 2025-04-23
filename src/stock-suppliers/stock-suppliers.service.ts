import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStockSupplierDto } from './dto/create-stock-supplier.dto';
import { UpdateStockSupplierDto } from './dto/update-stock-supplier.dto';
import { LoggerService } from '../common/logger/logger.service';

@Injectable()
export class StockSuppliersService {
  constructor(
    private prisma: PrismaService,
    private logger: LoggerService,
  ) {}

  async create(createStockSupplierDto: CreateStockSupplierDto) {
    try {
      const stockSupplier = await this.prisma.stockSupplier.create({
        data: createStockSupplierDto,
      });
      this.logger.log(`Stock supplier created with id: ${stockSupplier.id}`);
      return stockSupplier;
    } catch (error) {
      this.logger.error('Error creating stock supplier', error);
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.prisma.stockSupplier.findMany({
        include: {
          materials: true,
        },
      });
    } catch (error) {
      this.logger.error('Error finding all stock suppliers', error);
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const stockSupplier = await this.prisma.stockSupplier.findUnique({
        where: { id },
        include: {
          materials: true,
        },
      });

      if (!stockSupplier) {
        throw new NotFoundException(`Stock supplier with ID ${id} not found`);
      }

      return stockSupplier;
    } catch (error) {
      this.logger.error(`Error finding stock supplier with id: ${id}`, error);
      throw error;
    }
  }

  async update(id: number, updateStockSupplierDto: UpdateStockSupplierDto) {
    try {
      const stockSupplier = await this.prisma.stockSupplier.update({
        where: { id },
        data: updateStockSupplierDto,
      });
      this.logger.log(`Stock supplier updated with id: ${stockSupplier.id}`);
      return stockSupplier;
    } catch (error) {
      this.logger.error(`Error updating stock supplier with id: ${id}`, error);
      throw error;
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.stockSupplier.delete({
        where: { id },
      });
      this.logger.log(`Stock supplier deleted with id: ${id}`);
    } catch (error) {
      this.logger.error(`Error deleting stock supplier with id: ${id}`, error);
      throw error;
    }
  }
}
