import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { LoggerService } from '../common/logger/logger.service';

@Injectable()
export class NotificationsService {
  constructor(
    private prisma: PrismaService,
    private logger: LoggerService,
  ) {}

  async create(createNotificationDto: CreateNotificationDto) {
    try {
      const notification = await this.prisma.notification.create({
        data: createNotificationDto,
      });
      this.logger.log(`Notification created with id: ${notification.id}`);
      return notification;
    } catch (error) {
      this.logger.error('Error creating notification', error);
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.prisma.notification.findMany({
        include: {
          message: true,
        },
      });
    } catch (error) {
      this.logger.error('Error finding all notifications', error);
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const notification = await this.prisma.notification.findUnique({
        where: { id },
        include: {
          message: true,
        },
      });

      if (!notification) {
        throw new NotFoundException(`Notification with ID ${id} not found`);
      }

      return notification;
    } catch (error) {
      this.logger.error(`Error finding notification with id: ${id}`, error);
      throw error;
    }
  }

  async update(id: number, updateNotificationDto: UpdateNotificationDto) {
    try {
      const notification = await this.prisma.notification.update({
        where: { id },
        data: updateNotificationDto,
      });
      this.logger.log(`Notification updated with id: ${notification.id}`);
      return notification;
    } catch (error) {
      this.logger.error(`Error updating notification with id: ${id}`, error);
      throw error;
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.notification.delete({
        where: { id },
      });
      this.logger.log(`Notification deleted with id: ${id}`);
    } catch (error) {
      this.logger.error(`Error deleting notification with id: ${id}`, error);
      throw error;
    }
  }
}
