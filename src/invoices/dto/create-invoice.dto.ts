import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiExtraModels } from '@nestjs/swagger';

export const createInvoiceSchema = z.object({
  type: z.string().min(1),
  clientId: z.number().int().positive(),
  quoteId: z.number().int().positive().optional(),
  vatId: z.number().int().positive(),
  date: z.date().optional(),
});
@ApiExtraModels()
export class CreateInvoiceDto extends createZodDto(createInvoiceSchema) {}
