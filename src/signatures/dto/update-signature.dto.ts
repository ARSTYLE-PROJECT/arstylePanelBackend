import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiExtraModels } from '@nestjs/swagger';

export const updateSignatureSchema = z.object({
  quoteId: z.number().int().positive().optional(),
  date: z.date().optional(),
  comments: z.string().optional(),
});

@ApiExtraModels()
export class UpdateSignatureDto extends createZodDto(updateSignatureSchema) {}
