import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { LoggerService } from '../common/logger/logger.service';

@Injectable()
export class PaymentsService {
  constructor(
    private prisma: PrismaService,
    private logger: LoggerService,
  ) {}

  async create(createPaymentDto: CreatePaymentDto) {
    try {
      const payment = await this.prisma.payment.create({
        data: createPaymentDto,
      });
      this.logger.log(`Payment created with id: ${payment.id}`);
      return payment;
    } catch (error) {
      this.logger.error('Error creating payment', error);
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.prisma.payment.findMany({
        include: {
          invoice: true,
        },
      });
    } catch (error) {
      this.logger.error('Error finding all payments', error);
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const payment = await this.prisma.payment.findUnique({
        where: { id },
        include: {
          invoice: true,
        },
      });

      if (!payment) {
        throw new NotFoundException(`Payment with ID ${id} not found`);
      }

      return payment;
    } catch (error) {
      this.logger.error(`Error finding payment with id: ${id}`, error);
      throw error;
    }
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    try {
      const payment = await this.prisma.payment.update({
        where: { id },
        data: updatePaymentDto,
      });
      this.logger.log(`Payment updated with id: ${payment.id}`);
      return payment;
    } catch (error) {
      this.logger.error(`Error updating payment with id: ${id}`, error);
      throw error;
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.payment.delete({
        where: { id },
      });
      this.logger.log(`Payment deleted with id: ${id}`);
    } catch (error) {
      this.logger.error(`Error deleting payment with id: ${id}`, error);
      throw error;
    }
  }
}
