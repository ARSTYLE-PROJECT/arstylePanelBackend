import { Module } from '@nestjs/common';
import { StockSuppliersService } from './stock-suppliers.service';
import { StockSuppliersController } from './stock-suppliers.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { LoggerModule } from '../common/logger/logger.module';

@Module({
  imports: [PrismaModule, LoggerModule],
  controllers: [StockSuppliersController],
  providers: [StockSuppliersService],
  exports: [StockSuppliersService],
})
export class StockSuppliersModule {}
