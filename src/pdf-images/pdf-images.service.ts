import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePdfImageDto } from './dto/create-pdf-image.dto';
import { UpdatePdfImageDto } from './dto/update-pdf-image.dto';
import { LoggerService } from '../common/logger/logger.service';

@Injectable()
export class PdfImagesService {
  constructor(
    private prisma: PrismaService,
    private logger: LoggerService,
  ) {}

  async create(createPdfImageDto: CreatePdfImageDto) {
    try {
      const pdfImage = await this.prisma.pdfImage.create({
        data: createPdfImageDto,
      });
      this.logger.log(`Pdf image created with id: ${pdfImage.id}`);
      return pdfImage;
    } catch (error) {
      this.logger.error('Error creating pdf image', error);
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.prisma.pdfImage.findMany({
        include: {
          quote: true,
          invoice: true,
        },
      });
    } catch (error) {
      this.logger.error('Error finding all pdf images', error);
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const pdfImage = await this.prisma.pdfImage.findUnique({
        where: { id },
        include: {
          quote: true,
          invoice: true,
        },
      });

      if (!pdfImage) {
        throw new NotFoundException(`Pdf image with ID ${id} not found`);
      }

      return pdfImage;
    } catch (error) {
      this.logger.error(`Error finding pdf image with id: ${id}`, error);
      throw error;
    }
  }

  async update(id: number, updatePdfImageDto: UpdatePdfImageDto) {
    try {
      const pdfImage = await this.prisma.pdfImage.update({
        where: { id },
        data: updatePdfImageDto,
      });
      this.logger.log(`Pdf image updated with id: ${pdfImage.id}`);
      return pdfImage;
    } catch (error) {
      this.logger.error(`Error updating pdf image with id: ${id}`, error);
      throw error;
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.pdfImage.delete({
        where: { id },
      });
      this.logger.log(`Pdf image deleted with id: ${id}`);
    } catch (error) {
      this.logger.error(`Error deleting pdf image with id: ${id}`, error);
      throw error;
    }
  }
}
