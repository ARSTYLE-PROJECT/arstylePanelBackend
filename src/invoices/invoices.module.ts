import { Module } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { LoggerModule } from '../common/logger/logger.module';
import { JwtService } from '@nestjs/jwt';
@Module({
  imports: [PrismaModule, LoggerModule],
  controllers: [InvoicesController],
  providers: [InvoicesService, JwtService],
  exports: [InvoicesService],
})
export class InvoicesModule {}
