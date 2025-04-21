import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateChargeDto } from './dto/create-charge.dto';
import { UpdateChargeDto } from './dto/update-charge.dto';
import { LoggerService } from '../common/logger/logger.service';

@Injectable()
export class ChargesService {
  constructor(
    private prisma: PrismaService,
    private logger: LoggerService,
  ) {}

  async create(createChargeDto: CreateChargeDto) {
    try {
      return await this.prisma.charge.create({
        data: createChargeDto,
        include: {
          expenses: true,
        },
      });
    } catch (error) {
      this.logger.error('Failed to create charge', error);
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.prisma.charge.findMany({
        include: {
          expenses: true,
        },
      });
    } catch (error) {
      this.logger.error('Failed to fetch charges', error);
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const charge = await this.prisma.charge.findUnique({
        where: { id },
        include: {
          expenses: true,
        },
      });

      if (!charge) {
        throw new NotFoundException(`Charge with ID ${id} not found`);
      }

      return charge;
    } catch (error) {
      this.logger.error(`Failed to fetch charge with ID ${id}`, error);
      throw error;
    }
  }

  async update(id: number, updateChargeDto: UpdateChargeDto) {
    try {
      const charge = await this.prisma.charge.findUnique({
        where: { id },
      });

      if (!charge) {
        throw new NotFoundException(`Charge with ID ${id} not found`);
      }

      return await this.prisma.charge.update({
        where: { id },
        data: updateChargeDto,
        include: {
          expenses: true,
        },
      });
    } catch (error) {
      this.logger.error(`Failed to update charge with ID ${id}`, error);
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const charge = await this.prisma.charge.findUnique({
        where: { id },
      });

      if (!charge) {
        throw new NotFoundException(`Charge with ID ${id} not found`);
      }

      return await this.prisma.charge.delete({
        where: { id },
      });
    } catch (error) {
      this.logger.error(`Failed to delete charge with ID ${id}`, error);
      throw error;
    }
  }
}
