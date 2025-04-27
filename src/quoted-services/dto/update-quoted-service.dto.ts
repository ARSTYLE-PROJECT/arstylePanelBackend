import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

export const updateQuotedServiceSchema = z.object({
  serviceType: z.string().min(1).optional(),
  rateId: z.number().int().positive().optional(),
  quoteId: z.number().int().positive().optional(),
});

@ApiExtraModels()
export class UpdateQuotedServiceDto extends createZodDto(
  updateQuotedServiceSchema,
) {
  @ApiProperty({
    example: 'Installation',
    description: 'The type of service being quoted',
    required: false,
  })
  serviceType?: string;

  @ApiProperty({
    example: 1,
    description: 'The ID of the rate applied to this service',
    type: 'number',
    required: false,
  })
  rateId?: number;

  @ApiProperty({
    example: 1,
    description: 'The ID of the quote this service belongs to',
    type: 'number',
    required: false,
  })
  quoteId?: number;
}
