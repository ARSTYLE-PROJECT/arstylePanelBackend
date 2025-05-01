import { Module } from '@nestjs/common';
import { ChargesService } from './charges.service';
import { ChargesController } from './charges.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule],
  providers: [ChargesService, JwtService],
  controllers: [ChargesController],
  exports: [ChargesService],
})
export class ChargesModule {}
