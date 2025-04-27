import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

export const updateChargeSchema = z.object({
  type: z.string().min(1).optional(),
});

@ApiExtraModels()
export class UpdateChargeDto extends createZodDto(updateChargeSchema) {
  @ApiProperty({
    example: 'electricity',
    description: 'Type of charge',
    required: false,
  })
  type?: string;
}
