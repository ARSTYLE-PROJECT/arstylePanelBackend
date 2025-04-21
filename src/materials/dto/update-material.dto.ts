import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiExtraModels } from '@nestjs/swagger';

export const updateMaterialSchema = z.object({
  name: z.string().min(1).optional(),
  quantity: z.number().positive().optional(),
  unit: z.string().min(1).optional(),
  purchasePrice: z.number().positive().optional(),
  stockSupplierId: z.number().optional(),
  categoryId: z.number().optional(),
  supplierId: z.number().optional(),
});

@ApiExtraModels()
export class UpdateMaterialDto extends createZodDto(updateMaterialSchema) {}
