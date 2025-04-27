import { Module } from '@nestjs/common';
import { MaterialCategoriesService } from './material-categories.service';
import { MaterialCategoriesController } from './material-categories.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { LoggerModule } from '../common/logger/logger.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, LoggerModule],
  controllers: [MaterialCategoriesController],
  providers: [MaterialCategoriesService, JwtService],
  exports: [MaterialCategoriesService],
})
export class MaterialCategoriesModule {}
