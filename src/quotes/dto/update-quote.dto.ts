import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiExtraModels } from '@nestjs/swagger';

export const updateQuoteSchema = z.object({
  clientId: z.number().int().positive().optional(),
  vatId: z.number().int().positive().optional(),
  date: z.date().optional(),
});

export class UpdateQuoteDto extends createZodDto(updateQuoteSchema) {}
