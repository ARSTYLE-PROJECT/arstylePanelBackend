import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMaterialCategoryDto } from './dto/create-material-category.dto';
import { UpdateMaterialCategoryDto } from './dto/update-material-category.dto';
import { LoggerService } from '../common/logger/logger.service';

@Injectable()
export class MaterialCategoriesService {
  constructor(
    private prisma: PrismaService,
    private logger: LoggerService,
  ) {}

  async create(createMaterialCategoryDto: CreateMaterialCategoryDto) {
    try {
      const materialCategory = await this.prisma.materialCategory.create({
        data: createMaterialCategoryDto,
      });
      this.logger.log(
        `Material category created with id: ${materialCategory.id}`,
      );
      return materialCategory;
    } catch (error) {
      this.logger.error('Error creating material category', error);
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.prisma.materialCategory.findMany({
        include: {
          materials: true,
        },
      });
    } catch (error) {
      this.logger.error('Error finding all material categories', error);
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const materialCategory = await this.prisma.materialCategory.findUnique({
        where: { id },
        include: {
          materials: true,
        },
      });

      if (!materialCategory) {
        throw new NotFoundException(
          `Material category with ID ${id} not found`,
        );
      }

      return materialCategory;
    } catch (error) {
      this.logger.error(
        `Error finding material category with id: ${id}`,
        error,
      );
      throw error;
    }
  }

  async update(
    id: number,
    updateMaterialCategoryDto: UpdateMaterialCategoryDto,
  ) {
    try {
      const materialCategory = await this.prisma.materialCategory.update({
        where: { id },
        data: updateMaterialCategoryDto,
      });
      this.logger.log(
        `Material category updated with id: ${materialCategory.id}`,
      );
      return materialCategory;
    } catch (error) {
      this.logger.error(
        `Error updating material category with id: ${id}`,
        error,
      );
      throw error;
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.materialCategory.delete({
        where: { id },
      });
      this.logger.log(`Material category deleted with id: ${id}`);
    } catch (error) {
      this.logger.error(
        `Error deleting material category with id: ${id}`,
        error,
      );
      throw error;
    }
  }
}
