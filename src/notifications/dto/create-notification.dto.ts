import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiExtraModels } from '@nestjs/swagger';

export const createNotificationSchema = z.object({
  type: z.string().min(1),
  messageId: z.number().int().positive(),
  status: z.string().min(1),
  readTime: z.number().int().positive().optional(),
});
@ApiExtraModels()
export class CreateNotificationDto extends createZodDto(
  createNotificationSchema,
) {}
