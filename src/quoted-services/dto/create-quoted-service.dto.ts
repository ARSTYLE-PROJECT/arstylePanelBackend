import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

export const createQuotedServiceSchema = z.object({
  serviceType: z.string().min(1),
  rateId: z.number().int().positive(),
  quoteId: z.number().int().positive().optional(),
});

@ApiExtraModels()
export class CreateQuotedServiceDto extends createZodDto(
  createQuotedServiceSchema,
) {
  @ApiProperty({
    example: 'Installation',
    description: 'The type of service being quoted',
  })
  serviceType: string;

  @ApiProperty({
    example: 1,
    description: 'The ID of the rate applied to this service',
    type: 'number',
  })
  rateId: number;

  @ApiProperty({
    example: 1,
    description: 'The ID of the quote this service belongs to',
    type: 'number',
    required: false,
  })
  quoteId?: number;
}
