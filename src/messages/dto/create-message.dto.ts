import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

export const createMessageSchema = z.object({
  content: z.string().min(1),
  clientId: z.number().int().positive(),
  date: z.date().optional(),
});
@ApiExtraModels()
export class CreateMessageDto extends createZodDto(createMessageSchema) {
  @ApiProperty({
    example: 'Thank you for your inquiry about our services.',
    description: 'The content of the message',
  })
  content: string;

  @ApiProperty({
    example: 1,
    description: 'The ID of the client the message is for',
    type: 'number',
  })
  clientId: number;

  @ApiProperty({
    example: '2023-08-25T14:00:00Z',
    description: 'The date the message was sent',
    type: 'string',
    format: 'date-time',
    required: false,
  })
  date?: Date;
}
