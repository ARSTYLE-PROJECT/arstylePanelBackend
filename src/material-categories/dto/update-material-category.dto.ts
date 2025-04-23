import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiExtraModels } from '@nestjs/swagger';

export const updateMaterialCategorySchema = z.object({
  name: z.string().min(1).optional(),
});
@ApiExtraModels()
export class UpdateMaterialCategoryDto extends createZodDto(
  updateMaterialCategorySchema,
) {}
