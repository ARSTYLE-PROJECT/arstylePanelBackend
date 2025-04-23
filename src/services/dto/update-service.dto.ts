import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiExtraModels } from '@nestjs/swagger';

export const updateServiceSchema = z.object({
  type: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  priceExcludingTax: z.number().positive().optional(),
});

@ApiExtraModels()
export class UpdateServiceDto extends createZodDto(updateServiceSchema) {}
