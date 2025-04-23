import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiExtraModels } from '@nestjs/swagger';

export const updatePaymentSchema = z.object({
  amount: z.number().positive().optional(),
  invoiceId: z.number().int().positive().optional(),
  date: z.date().optional(),
});
@ApiExtraModels()
export class UpdatePaymentDto extends createZodDto(updatePaymentSchema) {}
