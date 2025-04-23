import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiExtraModels } from '@nestjs/swagger';

export const createPdfImageSchema = z.object({
  url: z.string().min(1),
  quoteId: z.number().int().positive().optional(),
  invoiceId: z.number().int().positive().optional(),
});

export class CreatePdfImageDto extends createZodDto(createPdfImageSchema) {}
