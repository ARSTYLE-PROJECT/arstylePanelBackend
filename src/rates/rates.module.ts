import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { LoggerModule } from '../common/logger/logger.module';
import { RatesController } from './rates.controller';
import { RatesService } from './rates.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, LoggerModule],
  controllers: [RatesController],
  providers: [RatesService, JwtService],
  exports: [RatesService],
})
export class RatesModule {}
