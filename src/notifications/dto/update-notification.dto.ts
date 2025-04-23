import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiExtraModels } from '@nestjs/swagger';

export const updateNotificationSchema = z.object({
  type: z.string().min(1).optional(),
  messageId: z.number().int().positive().optional(),
  status: z.string().min(1).optional(),
  readTime: z.number().int().positive().optional(),
});
@ApiExtraModels()
export class UpdateNotificationDto extends createZodDto(
  updateNotificationSchema,
) {}
