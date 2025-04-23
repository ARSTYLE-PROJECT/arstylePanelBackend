import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { LoggerModule } from '../common/logger/logger.module';
import { QuotedServicesController } from './quoted-services.controller';
import { QuotedServicesService } from './quoted-services.service';

@Module({
  imports: [PrismaModule, LoggerModule] as const,
  controllers: [QuotedServicesController],
  providers: [QuotedServicesService],
  exports: [QuotedServicesService],
})
export class QuotedServicesModule {}
