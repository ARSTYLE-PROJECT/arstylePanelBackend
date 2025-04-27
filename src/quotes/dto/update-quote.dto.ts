import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

export const updateQuoteSchema = z.object({
  clientId: z.number().int().positive().optional(),
  vatId: z.number().int().positive().optional(),
  date: z.date().optional(),
});

@ApiExtraModels()
export class UpdateQuoteDto extends createZodDto(updateQuoteSchema) {
  @ApiProperty({
    example: 1,
    description: 'The ID of the client this quote is for',
    type: 'number',
    required: false,
  })
  clientId?: number;

  @ApiProperty({
    example: 1,
    description: 'The ID of the VAT rate to apply',
    type: 'number',
    required: false,
  })
  vatId?: number;

  @ApiProperty({
    example: '2023-08-25T14:00:00Z',
    description: 'The date the quote was created',
    type: 'string',
    format: 'date-time',
    required: false,
  })
  date?: Date;
}
