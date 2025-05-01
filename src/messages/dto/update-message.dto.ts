import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

export const updateMessageSchema = z.object({
  content: z.string().min(1).optional(),
  clientId: z.number().int().positive().optional(),
  date: z.date().optional(),
});
@ApiExtraModels()
export class UpdateMessageDto extends createZodDto(updateMessageSchema) {
  @ApiProperty({
    example: 'Thank you for your inquiry about our services.',
    description: 'The content of the message',
    required: false,
  })
  content?: string;

  @ApiProperty({
    example: 1,
    description: 'The ID of the client the message is for',
    type: 'number',
    required: false,
  })
  clientId?: number;

  @ApiProperty({
    example: '2023-08-25T14:00:00Z',
    description: 'The date the message was sent',
    type: 'string',
    format: 'date-time',
    required: false,
  })
  date?: Date;
}
