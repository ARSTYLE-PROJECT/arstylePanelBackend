import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

export const createExpenseSchema = z.object({
  amount: z.number().positive(),
  type: z.string().min(1),
  chargeId: z.number(),
  date: z.string().datetime().optional(),
});

@ApiExtraModels()
export class CreateExpenseDto extends createZodDto(createExpenseSchema) {
  @ApiProperty({
    example: 150.5,
    description: 'The expense amount',
    type: 'number',
  })
  amount: number;

  @ApiProperty({
    example: 'Material',
    description: 'The expense type',
  })
  type: string;

  @ApiProperty({
    example: 1,
    description: 'The associated charge ID',
    type: 'number',
  })
  chargeId: number;

  @ApiProperty({
    example: '2023-10-15T14:30:00Z',
    description: 'The date of the expense',
    required: false,
  })
  date?: string;
}
