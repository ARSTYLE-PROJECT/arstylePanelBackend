import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiExtraModels } from '@nestjs/swagger';

export const createPaymentSchema = z.object({
  amount: z.number().positive(),
  invoiceId: z.number().int().positive(),
  date: z.date().optional(),
});
@ApiExtraModels()
export class CreatePaymentDto extends createZodDto(createPaymentSchema) {}
