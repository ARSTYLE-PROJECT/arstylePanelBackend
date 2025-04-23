import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiExtraModels } from '@nestjs/swagger';

export const createStockSupplierSchema = z.object({
  name: z.string().min(1),
  deliveryTime: z.number().int().positive(),
});

@ApiExtraModels()
export class CreateStockSupplierDto extends createZodDto(
  createStockSupplierSchema,
) {}
