import { Module } from '@nestjs/common';
import { ExpensesController } from './expenses.controller';
import { ExpensesService } from './expenses.service';
import { PrismaModule } from '../prisma/prisma.module';
import { LoggerModule } from '../common/logger/logger.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, LoggerModule],
  controllers: [ExpensesController],
  providers: [ExpensesService, JwtService],
})
export class ExpensesModule {}
