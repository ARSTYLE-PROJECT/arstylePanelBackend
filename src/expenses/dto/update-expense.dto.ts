import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiExtraModels } from '@nestjs/swagger';

export const updateExpenseSchema = z.object({
  amount: z.number().positive().optional(),
  type: z.string().min(1).optional(),
  chargeId: z.number().optional(),
  date: z.string().datetime().optional(),
});

@ApiExtraModels()
export class UpdateExpenseDto extends createZodDto(updateExpenseSchema) {}
