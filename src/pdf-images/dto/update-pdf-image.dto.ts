import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

export const updatePdfImageSchema = z.object({
  url: z.string().min(1).optional(),
  quoteId: z.number().int().positive().optional(),
  invoiceId: z.number().int().positive().optional(),
});

@ApiExtraModels()
export class UpdatePdfImageDto extends createZodDto(updatePdfImageSchema) {
  @ApiProperty({
    example: 'https://example.com/images/quote-preview.jpg',
    description: 'The URL of the PDF image',
    required: false,
  })
  url?: string;

  @ApiProperty({
    example: 1,
    description: 'The ID of the associated quote',
    type: 'number',
    required: false,
  })
  quoteId?: number;

  @ApiProperty({
    example: 1,
    description: 'The ID of the associated invoice',
    type: 'number',
    required: false,
  })
  invoiceId?: number;
}
