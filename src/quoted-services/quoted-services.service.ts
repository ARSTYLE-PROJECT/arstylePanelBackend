import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuotedServiceDto } from './dto/create-quoted-service.dto';
import { UpdateQuotedServiceDto } from './dto/update-quoted-service.dto';
import { LoggerService } from '../common/logger/logger.service';

@Injectable()
export class QuotedServicesService {
  constructor(
    private prisma: PrismaService,
    private logger: LoggerService,
  ) {}

  async create(createQuotedServiceDto: CreateQuotedServiceDto) {
    try {
      const quotedService = await this.prisma.quotedService.create({
        data: createQuotedServiceDto,
      });
      this.logger.log(`Quoted service created with id: ${quotedService.id}`);
      return quotedService;
    } catch (error) {
      this.logger.error('Error creating quoted service', error);
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.prisma.quotedService.findMany({
        include: {
          serviceType: true,
          rate: true,
          Quote: true,
        },
      });
    } catch (error) {
      this.logger.error('Error finding all quoted services', error);
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const quotedService = await this.prisma.quotedService.findUnique({
        where: { id },
        include: {
          serviceType: true,
          rate: true,
          Quote: true,
        },
      });

      if (!quotedService) {
        throw new NotFoundException(`Quoted service with ID ${id} not found`);
      }

      return quotedService;
    } catch (error) {
      this.logger.error(`Error finding quoted service with id: ${id}`, error);
      throw error;
    }
  }

  async update(id: number, updateQuotedServiceDto: UpdateQuotedServiceDto) {
    try {
      const quotedService = await this.prisma.quotedService.update({
        where: { id },
        data: updateQuotedServiceDto,
      });
      this.logger.log(`Quoted service updated with id: ${quotedService.id}`);
      return quotedService;
    } catch (error) {
      this.logger.error(`Error updating quoted service with id: ${id}`, error);
      throw error;
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.quotedService.delete({
        where: { id },
      });
      this.logger.log(`Quoted service deleted with id: ${id}`);
    } catch (error) {
      this.logger.error(`Error deleting quoted service with id: ${id}`, error);
      throw error;
    }
  }
}
