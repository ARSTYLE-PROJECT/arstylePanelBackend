import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { LoggerService } from '../common/logger/logger.service';

@Injectable()
export class ExpensesService {
  constructor(
    private prisma: PrismaService,
    private logger: LoggerService,
  ) {}

  async create(createExpenseDto: CreateExpenseDto) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { chargeId: _, ...rest } = createExpenseDto;
      return await this.prisma.expense.create({
        data: {
          ...rest,
          charge: {
            connect: { id: createExpenseDto.chargeId },
          },
        },
        include: {
          charge: true,
        },
      });
    } catch (error) {
      this.logger.error('Failed to create expense', error);
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.prisma.expense.findMany({
        include: {
          charge: true,
        },
      });
    } catch (error) {
      this.logger.error('Failed to fetch expenses', error);
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const expense = await this.prisma.expense.findUnique({
        where: { id },
        include: {
          charge: true,
        },
      });

      if (!expense) {
        throw new NotFoundException(`Expense with ID ${id} not found`);
      }

      return expense;
    } catch (error) {
      this.logger.error(`Failed to fetch expense with ID ${id}`, error);
      throw error;
    }
  }

  async update(id: number, updateExpenseDto: UpdateExpenseDto) {
    try {
      const expense = await this.prisma.expense.findUnique({
        where: { id },
      });

      if (!expense) {
        throw new NotFoundException(`Expense with ID ${id} not found`);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { chargeId: _, ...rest } = updateExpenseDto;
      return await this.prisma.expense.update({
        where: { id },
        data: {
          ...rest,
          charge: updateExpenseDto.chargeId
            ? {
                connect: { id: updateExpenseDto.chargeId },
              }
            : undefined,
        },
        include: {
          charge: true,
        },
      });
    } catch (error) {
      this.logger.error(`Failed to update expense with ID ${id}`, error);
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const expense = await this.prisma.expense.findUnique({
        where: { id },
      });

      if (!expense) {
        throw new NotFoundException(`Expense with ID ${id} not found`);
      }

      return await this.prisma.expense.delete({
        where: { id },
      });
    } catch (error) {
      this.logger.error(`Failed to delete expense with ID ${id}`, error);
      throw error;
    }
  }
}
