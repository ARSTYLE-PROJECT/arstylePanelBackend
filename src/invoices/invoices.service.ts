import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { LoggerService } from '../common/logger/logger.service';

@Injectable()
export class InvoicesService {
  constructor(
    private prisma: PrismaService,
    private logger: LoggerService,
  ) {}

  async create(createInvoiceDto: CreateInvoiceDto) {
    try {
      const invoice = await this.prisma.invoice.create({
        data: createInvoiceDto,
      });
      this.logger.log(`Invoice created with id: ${invoice.id}`);
      return invoice;
    } catch (error) {
      this.logger.error('Error creating invoice', error);
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.prisma.invoice.findMany({
        include: {
          client: true,
          quote: true,
          vat: true,
          payments: true,
          pdfImages: true,
          InvoiceToService: {
            include: {
              service: true,
            },
          },
        },
      });
    } catch (error) {
      this.logger.error('Error finding all invoices', error);
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const invoice = await this.prisma.invoice.findUnique({
        where: { id },
        include: {
          client: true,
          quote: true,
          vat: true,
          payments: true,
          pdfImages: true,
          InvoiceToService: {
            include: {
              service: true,
            },
          },
        },
      });

      if (!invoice) {
        throw new NotFoundException(`Invoice with ID ${id} not found`);
      }

      return invoice;
    } catch (error) {
      this.logger.error(`Error finding invoice with id: ${id}`, error);
      throw error;
    }
  }

  async update(id: number, updateInvoiceDto: UpdateInvoiceDto) {
    try {
      const invoice = await this.prisma.invoice.update({
        where: { id },
        data: updateInvoiceDto,
      });
      this.logger.log(`Invoice updated with id: ${invoice.id}`);
      return invoice;
    } catch (error) {
      this.logger.error(`Error updating invoice with id: ${id}`, error);
      throw error;
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.invoice.delete({
        where: { id },
      });
      this.logger.log(`Invoice deleted with id: ${id}`);
    } catch (error) {
      this.logger.error(`Error deleting invoice with id: ${id}`, error);
      throw error;
    }
  }
}
