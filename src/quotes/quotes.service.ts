import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { LoggerService } from '../common/logger/logger.service';

@Injectable()
export class QuotesService {
  constructor(
    private prisma: PrismaService,
    private logger: LoggerService,
  ) {}

  async create(createQuoteDto: CreateQuoteDto) {
    try {
      const quote = await this.prisma.quote.create({
        data: createQuoteDto,
      });
      this.logger.log(`Quote created with id: ${quote.id}`);
      return quote;
    } catch (error) {
      this.logger.error('Error creating quote', error);
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.prisma.quote.findMany({
        include: {
          client: true,
          vat: true,
          pdfImages: true,
          quotedServices: {
            include: {
              rate: true,
            },
          },
          Invoice: true,
          Signature: true,
          QuoteToService: {
            include: {
              service: true,
            },
          },
        },
      });
    } catch (error) {
      this.logger.error('Error finding all quotes', error);
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const quote = await this.prisma.quote.findUnique({
        where: { id },
        include: {
          client: true,
          vat: true,
          pdfImages: true,
          quotedServices: {
            include: {
              rate: true,
            },
          },
          Invoice: true,
          Signature: true,
          QuoteToService: {
            include: {
              service: true,
            },
          },
        },
      });

      if (!quote) {
        throw new NotFoundException(`Quote with ID ${id} not found`);
      }

      return quote;
    } catch (error) {
      this.logger.error(`Error finding quote with id: ${id}`, error);
      throw error;
    }
  }

  async update(id: number, updateQuoteDto: UpdateQuoteDto) {
    try {
      const quote = await this.prisma.quote.update({
        where: { id },
        data: updateQuoteDto,
      });
      this.logger.log(`Quote updated with id: ${quote.id}`);
      return quote;
    } catch (error) {
      this.logger.error(`Error updating quote with id: ${id}`, error);
      throw error;
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.quote.delete({
        where: { id },
      });
      this.logger.log(`Quote deleted with id: ${id}`);
    } catch (error) {
      this.logger.error(`Error deleting quote with id: ${id}`, error);
      throw error;
    }
  }
}
