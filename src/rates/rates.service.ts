import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRateDto } from './dto/create-rate.dto';
import { LoggerService } from '../common/logger/logger.service';
import { UpdateRateDto } from './dto/update-rate.dto';
@Injectable()
export class RatesService {
  constructor(
    private prisma: PrismaService,
    private logger: LoggerService,
  ) {}

  async create(createRateDto: CreateRateDto) {
    try {
      const rate = await this.prisma.rate.create({
        data: createRateDto,
      });
      this.logger.log(`Rate created with id: ${rate.id}`);
      return rate;
    } catch (error) {
      this.logger.error('Error creating rate', error);
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.prisma.rate.findMany({
        include: {
          quotedServices: true,
        },
      });
    } catch (error) {
      this.logger.error('Error finding all rates', error);
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const rate = await this.prisma.rate.findUnique({
        where: { id },
        include: {
          quotedServices: true,
        },
      });

      if (!rate) {
        throw new NotFoundException(`Rate with ID ${id} not found`);
      }

      return rate;
    } catch (error) {
      this.logger.error(`Error finding rate with id: ${id}`, error);
      throw error;
    }
  }

  async update(id: number, updateRateDto: UpdateRateDto) {
    try {
      const rate = await this.prisma.rate.update({
        where: { id },
        data: updateRateDto,
      });
      this.logger.log(`Rate updated with id: ${rate.id}`);
      return rate;
    } catch (error) {
      this.logger.error(`Error updating rate with id: ${id}`, error);
      throw error;
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.rate.delete({
        where: { id },
      });
      this.logger.log(`Rate deleted with id: ${id}`);
    } catch (error) {
      this.logger.error(`Error deleting rate with id: ${id}`, error);
      throw error;
    }
  }
}
