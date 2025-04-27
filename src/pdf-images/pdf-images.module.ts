import { Module } from '@nestjs/common';
import { PdfImagesService } from './pdf-images.service';
import { PdfImagesController } from './pdf-images.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { LoggerModule } from '../common/logger/logger.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, LoggerModule],
  controllers: [PdfImagesController],
  providers: [PdfImagesService, JwtService],
  exports: [PdfImagesService],
})
export class PdfImagesModule {}
