import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

export const createPaymentSchema = z.object({
  amount: z.number().positive(),
  invoiceId: z.number().int().positive(),
  date: z.date().optional(),
});
@ApiExtraModels()
export class CreatePaymentDto extends createZodDto(createPaymentSchema) {
  @ApiProperty({
    example: 250.5,
    description: 'The payment amount',
    type: 'number',
  })
  amount: number;

  @ApiProperty({
    example: 1,
    description: 'The ID of the associated invoice',
    type: 'number',
  })
  invoiceId: number;

  @ApiProperty({
    example: '2023-08-25T14:00:00Z',
    description: 'The payment date',
    type: 'string',
    format: 'date-time',
    required: false,
  })
  date?: Date;
}
