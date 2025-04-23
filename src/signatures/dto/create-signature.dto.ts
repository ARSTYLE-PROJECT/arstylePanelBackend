import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiExtraModels } from '@nestjs/swagger';

export const createSignatureSchema = z.object({
  quoteId: z.number().int().positive(),
  date: z.date().optional(),
  comments: z.string().optional(),
});

@ApiExtraModels()
export class CreateSignatureDto extends createZodDto(createSignatureSchema) {}
