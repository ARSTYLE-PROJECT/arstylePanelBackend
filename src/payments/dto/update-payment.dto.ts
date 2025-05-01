import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

export const updatePaymentSchema = z.object({
  amount: z.number().positive().optional(),
  invoiceId: z.number().int().positive().optional(),
  date: z.date().optional(),
});
@ApiExtraModels()
export class UpdatePaymentDto extends createZodDto(updatePaymentSchema) {
  @ApiProperty({
    example: 250.5,
    description: 'The payment amount',
    type: 'number',
    required: false,
  })
  amount?: number;

  @ApiProperty({
    example: 1,
    description: 'The ID of the associated invoice',
    type: 'number',
    required: false,
  })
  invoiceId?: number;

  @ApiProperty({
    example: '2023-08-25T14:00:00Z',
    description: 'The payment date',
    type: 'string',
    format: 'date-time',
    required: false,
  })
  date?: Date;
}
