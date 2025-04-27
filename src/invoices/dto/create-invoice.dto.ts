import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

export const createInvoiceSchema = z.object({
  type: z.string().min(1),
  clientId: z.number().int().positive(),
  quoteId: z.number().int().positive().optional(),
  vatId: z.number().int().positive(),
  date: z.date().optional(),
});
@ApiExtraModels()
export class CreateInvoiceDto extends createZodDto(createInvoiceSchema) {
  @ApiProperty({
    example: 'standard',
    description: 'The type of invoice',
  })
  type: string;

  @ApiProperty({
    example: 1,
    description: 'The ID of the associated client',
    type: 'number',
  })
  clientId: number;

  @ApiProperty({
    example: 1,
    description: 'The ID of the associated quote',
    type: 'number',
    required: false,
  })
  quoteId?: number;

  @ApiProperty({
    example: 1,
    description: 'The ID of the VAT rate to apply',
    type: 'number',
  })
  vatId: number;

  @ApiProperty({
    example: '2023-08-25T14:00:00Z',
    description: 'The invoice date',
    type: 'string',
    format: 'date-time',
    required: false,
  })
  date?: Date;
}
