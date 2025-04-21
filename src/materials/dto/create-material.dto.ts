import { z } from 'zod';
import { ApiExtraModels } from '@nestjs/swagger';
import { createZodDto } from 'nestjs-zod';
export const createMaterialSchema = z.object({
  name: z.string().min(1),
  quantity: z.number().positive(),
  unit: z.string().min(1),
  purchasePrice: z.number().positive(),
  stockSupplierId: z.number().optional(),
  categoryId: z.number().optional(),
  supplierId: z.number().optional(),
});

@ApiExtraModels()
export class CreateMaterialDto extends createZodDto(createMaterialSchema) {}
