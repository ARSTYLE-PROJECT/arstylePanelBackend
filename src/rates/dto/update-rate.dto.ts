import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

export const updateRateSchema = z.object({
  description: z.string().min(1).optional(),
  priceExcludingTax: z.number().positive().optional(),
});

@ApiExtraModels()
export class UpdateRateDto extends createZodDto(updateRateSchema) {
  @ApiProperty({
    example: 'Hourly labor rate',
    description: 'The description of the rate',
    required: false,
  })
  description?: string;

  @ApiProperty({
    example: 45.5,
    description: 'The price excluding tax',
    type: 'number',
    required: false,
  })
  priceExcludingTax?: number;
}
