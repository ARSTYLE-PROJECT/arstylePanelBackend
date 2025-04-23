import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiExtraModels } from '@nestjs/swagger';

export const createQuoteSchema = z.object({
  clientId: z.number().int().positive(),
  vatId: z.number().int().positive(),
  date: z.date().optional(),
});

export class CreateQuoteDto extends createZodDto(createQuoteSchema) {}
