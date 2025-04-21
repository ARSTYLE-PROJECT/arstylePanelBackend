import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiExtraModels } from '@nestjs/swagger';

export const createExpenseSchema = z.object({
  amount: z.number().positive(),
  type: z.string().min(1),
  chargeId: z.number(),
  date: z.string().datetime().optional(),
});

@ApiExtraModels()
export class CreateExpenseDto extends createZodDto(createExpenseSchema) {}
