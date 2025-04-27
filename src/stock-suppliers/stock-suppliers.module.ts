import { Module } from '@nestjs/common';
import { StockSuppliersService } from './stock-suppliers.service';
import { StockSuppliersController } from './stock-suppliers.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { LoggerModule } from '../common/logger/logger.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, LoggerModule],
  controllers: [StockSuppliersController],
  providers: [StockSuppliersService, JwtService],
  exports: [StockSuppliersService],
})
export class StockSuppliersModule {}
