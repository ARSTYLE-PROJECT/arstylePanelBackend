import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiExtraModels } from '@nestjs/swagger';

export const updateQuotedServiceSchema = z.object({
  serviceType: z.string().min(1).optional(),
  rateId: z.number().int().positive().optional(),
  quoteId: z.number().int().positive().optional(),
});

@ApiExtraModels()
export class UpdateQuotedServiceDto extends createZodDto(
  updateQuotedServiceSchema,
) {}
