import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

export const createNotificationSchema = z.object({
  type: z.string().min(1),
  messageId: z.number().int().positive(),
  status: z.string().min(1),
  readTime: z.number().int().positive().optional(),
});
@ApiExtraModels()
export class CreateNotificationDto extends createZodDto(
  createNotificationSchema,
) {
  @ApiProperty({
    example: 'message',
    description: 'The type of notification',
  })
  type: string;

  @ApiProperty({
    example: 1,
    description: 'The ID of the message associated with this notification',
    type: 'number',
  })
  messageId: number;

  @ApiProperty({
    example: 'unread',
    description: 'The status of the notification',
  })
  status: string;

  @ApiProperty({
    example: 1640995200, // Unix timestamp
    description: 'The time when the notification was read (in Unix timestamp)',
    type: 'number',
    required: false,
  })
  readTime?: number;
}
