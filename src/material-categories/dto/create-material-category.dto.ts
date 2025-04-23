import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiExtraModels } from '@nestjs/swagger';

export const createMaterialCategorySchema = z.object({
  name: z.string().min(1),
});
@ApiExtraModels()
export class CreateMaterialCategoryDto extends createZodDto(
  createMaterialCategorySchema,
) {}
