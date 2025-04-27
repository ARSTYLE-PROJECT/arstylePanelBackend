import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

export const createServiceSchema = z.object({
  type: z.string().min(1),
  description: z.string().min(1),
  priceExcludingTax: z.number().positive(),
});

@ApiExtraModels()
export class CreateServiceDto extends createZodDto(createServiceSchema) {
  @ApiProperty({
    example: 'Installation',
    description: 'The type of service',
  })
  type: string;

  @ApiProperty({
    example: 'Full installation service including materials',
    description: 'Detailed description of the service',
  })
  description: string;

  @ApiProperty({
    example: 85.5,
    description: 'The price of the service excluding tax',
    type: 'number',
  })
  priceExcludingTax: number;
}
