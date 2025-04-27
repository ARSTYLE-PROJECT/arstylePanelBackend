import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

export const updateInvoiceSchema = z.object({
  type: z.string().min(1).optional(),
  clientId: z.number().int().positive().optional(),
  quoteId: z.number().int().positive().optional(),
  vatId: z.number().int().positive().optional(),
  date: z.date().optional(),
});
@ApiExtraModels()
export class UpdateInvoiceDto extends createZodDto(updateInvoiceSchema) {
  @ApiProperty({
    example: 'standard',
    description: 'The type of invoice',
    required: false,
  })
  type?: string;

  @ApiProperty({
    example: 1,
    description: 'The ID of the associated client',
    type: 'number',
    required: false,
  })
  clientId?: number;

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
    required: false,
  })
  vatId?: number;

  @ApiProperty({
    example: '2023-08-25T14:00:00Z',
    description: 'The invoice date',
    type: 'string',
    format: 'date-time',
    required: false,
  })
  date?: Date;
}
