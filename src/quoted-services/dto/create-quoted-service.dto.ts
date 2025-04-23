import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiExtraModels } from '@nestjs/swagger';

export const createQuotedServiceSchema = z.object({
  serviceType: z.string().min(1),
  rateId: z.number().int().positive(),
  quoteId: z.number().int().positive().optional(),
});

@ApiExtraModels()
export class CreateQuotedServiceDto extends createZodDto(
  createQuotedServiceSchema,
) {}
