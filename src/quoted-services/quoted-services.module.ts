import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { LoggerModule } from '../common/logger/logger.module';
import { QuotedServicesController } from './quoted-services.controller';
import { QuotedServicesService } from './quoted-services.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, LoggerModule],
  controllers: [QuotedServicesController],
  providers: [QuotedServicesService, JwtService],
  exports: [QuotedServicesService],
})
export class QuotedServicesModule {}
