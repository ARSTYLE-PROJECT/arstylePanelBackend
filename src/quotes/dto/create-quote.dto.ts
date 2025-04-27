import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

export const createQuoteSchema = z.object({
  clientId: z.number().int().positive(),
  vatId: z.number().int().positive(),
  date: z.date().optional(),
});

@ApiExtraModels()
export class CreateQuoteDto extends createZodDto(createQuoteSchema) {
  @ApiProperty({
    example: 1,
    description: 'The ID of the client this quote is for',
    type: 'number',
  })
  clientId: number;

  @ApiProperty({
    example: 1,
    description: 'The ID of the VAT rate to apply',
    type: 'number',
  })
  vatId: number;

  @ApiProperty({
    example: '2023-08-25T14:00:00Z',
    description: 'The date the quote was created',
    type: 'string',
    format: 'date-time',
    required: false,
  })
  date?: Date;
}
