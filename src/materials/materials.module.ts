import { Module } from '@nestjs/common';
import { MaterialsService } from './materials.service';
import { MaterialsController } from './materials.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule],
  providers: [MaterialsService, JwtService],
  controllers: [MaterialsController],
  exports: [MaterialsService],
})
export class MaterialsModule {}
