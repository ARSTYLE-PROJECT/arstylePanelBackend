import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiExtraModels } from '@nestjs/swagger';

export const createDocumentSchema = z.object({
  url: z.string().url(),
  type: z.string().min(1),
});

@ApiExtraModels()
export class CreateDocumentDto extends createZodDto(createDocumentSchema) {}
