import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { LoggerService } from '../common/logger/logger.service';

@Injectable()
export class MaterialsService {
  constructor(
    private prisma: PrismaService,
    private logger: LoggerService,
  ) {}

  async create(createMaterialDto: CreateMaterialDto) {
    try {
      return await this.prisma.material.create({
        data: createMaterialDto,
        include: {
          stockSupplier: true,
          category: true,
          supplier: true,
        },
      });
    } catch (error) {
      this.logger.error('Failed to create material', error);
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.prisma.material.findMany({
        include: {
          stockSupplier: true,
          category: true,
          supplier: true,
        },
      });
    } catch (error) {
      this.logger.error('Failed to fetch materials', error);
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const material = await this.prisma.material.findUnique({
        where: { id },
        include: {
          stockSupplier: true,
          category: true,
          supplier: true,
        },
      });

      if (!material) {
        throw new NotFoundException(`Material with ID ${id} not found`);
      }

      return material;
    } catch (error) {
      this.logger.error(`Failed to fetch material with ID ${id}`, error);
      throw error;
    }
  }

  async update(id: number, updateMaterialDto: UpdateMaterialDto) {
    try {
      const material = await this.prisma.material.findUnique({
        where: { id },
      });

      if (!material) {
        throw new NotFoundException(`Material with ID ${id} not found`);
      }

      return await this.prisma.material.update({
        where: { id },
        data: updateMaterialDto,
        include: {
          stockSupplier: true,
          category: true,
          supplier: true,
        },
      });
    } catch (error) {
      this.logger.error(`Failed to update material with ID ${id}`, error);
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const material = await this.prisma.material.findUnique({
        where: { id },
      });

      if (!material) {
        throw new NotFoundException(`Material with ID ${id} not found`);
      }

      return await this.prisma.material.delete({
        where: { id },
      });
    } catch (error) {
      this.logger.error(`Failed to delete material with ID ${id}`, error);
      throw error;
    }
  }
}
