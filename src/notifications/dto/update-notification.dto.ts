import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

export const updateNotificationSchema = z.object({
  type: z.string().min(1).optional(),
  messageId: z.number().int().positive().optional(),
  status: z.string().min(1).optional(),
  readTime: z.number().int().positive().optional(),
});
@ApiExtraModels()
export class UpdateNotificationDto extends createZodDto(
  updateNotificationSchema,
) {
  @ApiProperty({
    example: 'message',
    description: 'The type of notification',
    required: false,
  })
  type?: string;

  @ApiProperty({
    example: 1,
    description: 'The ID of the message associated with this notification',
    type: 'number',
    required: false,
  })
  messageId?: number;

  @ApiProperty({
    example: 'read',
    description: 'The status of the notification',
    required: false,
  })
  status?: string;

  @ApiProperty({
    example: 1640995200, // Unix timestamp
    description: 'The time when the notification was read (in Unix timestamp)',
    type: 'number',
    required: false,
  })
  readTime?: number;
}
