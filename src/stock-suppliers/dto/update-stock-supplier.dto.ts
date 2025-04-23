import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiExtraModels } from '@nestjs/swagger';

export const updateStockSupplierSchema = z.object({
  name: z.string().min(1).optional(),
  deliveryTime: z.number().int().positive().optional(),
});

@ApiExtraModels()
export class UpdateStockSupplierDto extends createZodDto(
  updateStockSupplierSchema,
) {}
