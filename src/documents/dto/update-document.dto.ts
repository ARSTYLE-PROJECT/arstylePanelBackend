import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiExtraModels } from '@nestjs/swagger';

export const updateDocumentSchema = z.object({
  url: z.string().url().optional(),
  type: z.string().min(1).optional(),
});

@ApiExtraModels()
export class UpdateDocumentDto extends createZodDto(updateDocumentSchema) {}
