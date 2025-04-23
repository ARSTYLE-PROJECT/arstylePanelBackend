import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { LoggerService } from '../common/logger/logger.service';

@Injectable()
export class ServicesService {
  constructor(
    private prisma: PrismaService,
    private logger: LoggerService,
  ) {}

  async create(createServiceDto: CreateServiceDto) {
    try {
      const service = await this.prisma.service.create({
        data: createServiceDto,
      });
      this.logger.log(`Service created with id: ${service.id}`);
      return service;
    } catch (error) {
      this.logger.error('Error creating service', error);
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.prisma.service.findMany({
        include: {
          invoiceServices: true,
          quoteServices: true,
        },
      });
    } catch (error) {
      this.logger.error('Error finding all services', error);
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const service = await this.prisma.service.findUnique({
        where: { id },
        include: {
          invoiceServices: true,
          quoteServices: true,
        },
      });

      if (!service) {
        throw new NotFoundException(`Service with ID ${id} not found`);
      }

      return service;
    } catch (error) {
      this.logger.error(`Error finding service with id: ${id}`, error);
      throw error;
    }
  }

  async update(id: number, updateServiceDto: UpdateServiceDto) {
    try {
      const service = await this.prisma.service.update({
        where: { id },
        data: updateServiceDto,
      });
      this.logger.log(`Service updated with id: ${service.id}`);
      return service;
    } catch (error) {
      this.logger.error(`Error updating service with id: ${id}`, error);
      throw error;
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.service.delete({
        where: { id },
      });
      this.logger.log(`Service deleted with id: ${id}`);
    } catch (error) {
      this.logger.error(`Error deleting service with id: ${id}`, error);
      throw error;
    }
  }
}
