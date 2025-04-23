import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { LoggerService } from '../common/logger/logger.service';

@Injectable()
export class MessagesService {
  constructor(
    private prisma: PrismaService,
    private logger: LoggerService,
  ) {}

  async create(createMessageDto: CreateMessageDto) {
    try {
      const message = await this.prisma.message.create({
        data: createMessageDto,
      });
      this.logger.log(`Message created with id: ${message.id}`);
      return message;
    } catch (error) {
      this.logger.error('Error creating message', error);
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.prisma.message.findMany({
        include: {
          client: true,
          Notification: true,
        },
      });
    } catch (error) {
      this.logger.error('Error finding all messages', error);
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const message = await this.prisma.message.findUnique({
        where: { id },
        include: {
          client: true,
          Notification: true,
        },
      });

      if (!message) {
        throw new NotFoundException(`Message with ID ${id} not found`);
      }

      return message;
    } catch (error) {
      this.logger.error(`Error finding message with id: ${id}`, error);
      throw error;
    }
  }

  async update(id: number, updateMessageDto: UpdateMessageDto) {
    try {
      const message = await this.prisma.message.update({
        where: { id },
        data: updateMessageDto,
      });
      this.logger.log(`Message updated with id: ${message.id}`);
      return message;
    } catch (error) {
      this.logger.error(`Error updating message with id: ${id}`, error);
      throw error;
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.message.delete({
        where: { id },
      });
      this.logger.log(`Message deleted with id: ${id}`);
    } catch (error) {
      this.logger.error(`Error deleting message with id: ${id}`, error);
      throw error;
    }
  }
}
