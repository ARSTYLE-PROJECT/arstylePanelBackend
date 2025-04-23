import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiExtraModels } from '@nestjs/swagger';

export const updatePdfImageSchema = z.object({
  url: z.string().min(1).optional(),
  quoteId: z.number().int().positive().optional(),
  invoiceId: z.number().int().positive().optional(),
});

export class UpdatePdfImageDto extends createZodDto(updatePdfImageSchema) {}
