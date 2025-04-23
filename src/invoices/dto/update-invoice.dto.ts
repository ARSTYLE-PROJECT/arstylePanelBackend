import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiExtraModels } from '@nestjs/swagger';

export const updateInvoiceSchema = z.object({
  type: z.string().min(1).optional(),
  clientId: z.number().int().positive().optional(),
  quoteId: z.number().int().positive().optional(),
  vatId: z.number().int().positive().optional(),
  date: z.date().optional(),
});
@ApiExtraModels()
export class UpdateInvoiceDto extends createZodDto(updateInvoiceSchema) {}
