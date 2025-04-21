import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { LoggerService } from '../common/logger/logger.service';

@Injectable()
export class DocumentsService {
  constructor(
    private prisma: PrismaService,
    private logger: LoggerService,
  ) {}

  async create(createDocumentDto: CreateDocumentDto) {
    try {
      return await this.prisma.document.create({
        data: createDocumentDto,
      });
    } catch (error) {
      this.logger.error('Failed to create document', error);
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.prisma.document.findMany();
    } catch (error) {
      this.logger.error('Failed to fetch documents', error);
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const document = await this.prisma.document.findUnique({
        where: { id },
      });

      if (!document) {
        throw new NotFoundException(`Document with ID ${id} not found`);
      }

      return document;
    } catch (error) {
      this.logger.error(`Failed to fetch document with ID ${id}`, error);
      throw error;
    }
  }

  async update(id: number, updateDocumentDto: UpdateDocumentDto) {
    try {
      const document = await this.prisma.document.findUnique({
        where: { id },
      });

      if (!document) {
        throw new NotFoundException(`Document with ID ${id} not found`);
      }

      return await this.prisma.document.update({
        where: { id },
        data: updateDocumentDto,
      });
    } catch (error) {
      this.logger.error(`Failed to update document with ID ${id}`, error);
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const document = await this.prisma.document.findUnique({
        where: { id },
      });

      if (!document) {
        throw new NotFoundException(`Document with ID ${id} not found`);
      }

      return await this.prisma.document.delete({
        where: { id },
      });
    } catch (error) {
      this.logger.error(`Failed to delete document with ID ${id}`, error);
      throw error;
    }
  }
}
