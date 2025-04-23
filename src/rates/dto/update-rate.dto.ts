import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiExtraModels } from '@nestjs/swagger';

export const updateRateSchema = z.object({
  description: z.string().min(1).optional(),
  priceExcludingTax: z.number().positive().optional(),
});

@ApiExtraModels()
export class UpdateRateDto extends createZodDto(updateRateSchema) {}
