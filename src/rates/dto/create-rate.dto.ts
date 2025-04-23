import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiExtraModels } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export const createRateSchema = z
  .object({
    description: z.string().min(1),
    priceExcludingTax: z.number().positive(),
  })
  .strict() satisfies z.ZodType<Prisma.RateCreateInput>;

@ApiExtraModels()
export class CreateRateDto extends createZodDto(createRateSchema) {}
