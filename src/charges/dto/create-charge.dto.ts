import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiProperty } from '@nestjs/swagger';

export const createChargeSchema = z.object({
  type: z.string().min(1),
});

export class CreateChargeDto extends createZodDto(createChargeSchema) {
  @ApiProperty({
    example: 'electricity',
    description: 'Type of charge',
  })
  type: string;
}
