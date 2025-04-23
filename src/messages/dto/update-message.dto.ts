import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiExtraModels } from '@nestjs/swagger';

export const updateMessageSchema = z.object({
  content: z.string().min(1).optional(),
  clientId: z.number().int().positive().optional(),
  date: z.date().optional(),
});
@ApiExtraModels()
export class UpdateMessageDto extends createZodDto(updateMessageSchema) {}
