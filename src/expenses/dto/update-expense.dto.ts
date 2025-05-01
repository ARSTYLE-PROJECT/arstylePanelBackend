import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

export const updateExpenseSchema = z.object({
  amount: z.number().positive().optional(),
  type: z.string().min(1).optional(),
  chargeId: z.number().optional(),
  date: z.string().datetime().optional(),
});

@ApiExtraModels()
export class UpdateExpenseDto extends createZodDto(updateExpenseSchema) {
  @ApiProperty({
    example: 150.5,
    description: 'The expense amount',
    type: 'number',
    required: false,
  })
  amount?: number;

  @ApiProperty({
    example: 'Material',
    description: 'The expense type',
    required: false,
  })
  type?: string;

  @ApiProperty({
    example: 1,
    description: 'The associated charge ID',
    type: 'number',
    required: false,
  })
  chargeId?: number;

  @ApiProperty({
    example: '2023-10-15T14:30:00Z',
    description: 'The date of the expense',
    required: false,
  })
  date?: string;
}
