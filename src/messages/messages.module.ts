import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { LoggerModule } from '../common/logger/logger.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, LoggerModule],
  controllers: [MessagesController],
  providers: [MessagesService, JwtService],
  exports: [MessagesService],
})
export class MessagesModule {}
