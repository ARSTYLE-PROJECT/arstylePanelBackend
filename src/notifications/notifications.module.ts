import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { LoggerModule } from '../common/logger/logger.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, LoggerModule],
  controllers: [NotificationsController],
  providers: [NotificationsService, JwtService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
