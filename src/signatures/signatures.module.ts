import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { LoggerModule } from '../common/logger/logger.module';
import { SignaturesController } from './signatures.controller';
import { SignaturesService } from './signatures.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, LoggerModule],
  controllers: [SignaturesController],
  providers: [SignaturesService, JwtService],
  exports: [SignaturesService],
})
export class SignaturesModule {}
