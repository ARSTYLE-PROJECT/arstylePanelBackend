import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiExtraModels } from '@nestjs/swagger';

export const createServiceSchema = z.object({
  type: z.string().min(1),
  description: z.string().min(1),
  priceExcludingTax: z.number().positive(),
});

@ApiExtraModels()
export class CreateServiceDto extends createZodDto(createServiceSchema) {}
