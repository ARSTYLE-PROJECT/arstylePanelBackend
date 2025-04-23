import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSignatureDto } from './dto/create-signature.dto';
import { UpdateSignatureDto } from './dto/update-signature.dto';
import { LoggerService } from '../common/logger/logger.service';

@Injectable()
export class SignaturesService {
  constructor(
    private prisma: PrismaService,
    private logger: LoggerService,
  ) {}

  async create(createSignatureDto: CreateSignatureDto) {
    try {
      const signature = await this.prisma.signature.create({
        data: createSignatureDto,
      });
      this.logger.log(`Signature created with id: ${signature.id}`);
      return signature;
    } catch (error) {
      this.logger.error('Error creating signature', error);
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.prisma.signature.findMany({
        include: {
          quote: true,
        },
      });
    } catch (error) {
      this.logger.error('Error finding all signatures', error);
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const signature = await this.prisma.signature.findUnique({
        where: { id },
        include: {
          quote: true,
        },
      });

      if (!signature) {
        throw new NotFoundException(`Signature with ID ${id} not found`);
      }

      return signature;
    } catch (error) {
      this.logger.error(`Error finding signature with id: ${id}`, error);
      throw error;
    }
  }

  async update(id: number, updateSignatureDto: UpdateSignatureDto) {
    try {
      const signature = await this.prisma.signature.update({
        where: { id },
        data: updateSignatureDto,
      });
      this.logger.log(`Signature updated with id: ${signature.id}`);
      return signature;
    } catch (error) {
      this.logger.error(`Error updating signature with id: ${id}`, error);
      throw error;
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.signature.delete({
        where: { id },
      });
      this.logger.log(`Signature deleted with id: ${id}`);
    } catch (error) {
      this.logger.error(`Error deleting signature with id: ${id}`, error);
      throw error;
    }
  }
}
