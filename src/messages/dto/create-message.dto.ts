import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiExtraModels } from '@nestjs/swagger';

export const createMessageSchema = z.object({
  content: z.string().min(1),
  clientId: z.number().int().positive(),
  date: z.date().optional(),
});
@ApiExtraModels()
export class CreateMessageDto extends createZodDto(createMessageSchema) {}
