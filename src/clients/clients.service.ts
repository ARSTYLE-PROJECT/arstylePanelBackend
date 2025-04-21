import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { LoggerService } from '../common/logger/logger.service';

@Injectable()
export class ClientsService {
  constructor(
    private prisma: PrismaService,
    private logger: LoggerService,
  ) {}

  async create(createClientDto: CreateClientDto) {
    try {
      return await this.prisma.client.create({
        data: createClientDto,
        include: {
          invoices: true,
          messages: true,
          workSites: true,
          Quote: true,
        },
      });
    } catch (error) {
      this.logger.error('Failed to create client', error);
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.prisma.client.findMany({
        include: {
          invoices: true,
          messages: true,
          workSites: true,
          Quote: true,
        },
      });
    } catch (error) {
      this.logger.error('Failed to fetch clients', error);
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const client = await this.prisma.client.findUnique({
        where: { id },
        include: {
          invoices: true,
          messages: true,
          workSites: true,
          Quote: true,
        },
      });

      if (!client) {
        throw new NotFoundException(`Client with ID ${id} not found`);
      }

      return client;
    } catch (error) {
      this.logger.error(`Failed to fetch client with ID ${id}`, error);
      throw error;
    }
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    try {
      const client = await this.prisma.client.findUnique({
        where: { id },
      });

      if (!client) {
        throw new NotFoundException(`Client with ID ${id} not found`);
      }

      return await this.prisma.client.update({
        where: { id },
        data: updateClientDto,
        include: {
          invoices: true,
          messages: true,
          workSites: true,
          Quote: true,
        },
      });
    } catch (error) {
      this.logger.error(`Failed to update client with ID ${id}`, error);
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const client = await this.prisma.client.findUnique({
        where: { id },
      });

      if (!client) {
        throw new NotFoundException(`Client with ID ${id} not found`);
      }

      return await this.prisma.client.delete({
        where: { id },
      });
    } catch (error) {
      this.logger.error(`Failed to delete client with ID ${id}`, error);
      throw error;
    }
  }
}
