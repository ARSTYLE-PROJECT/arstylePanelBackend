import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

export const createMaterialCategorySchema = z.object({
  name: z.string().min(1),
});
@ApiExtraModels()
export class CreateMaterialCategoryDto extends createZodDto(
  createMaterialCategorySchema,
) {
  @ApiProperty({
    example: 'Wood',
    description: 'The name of the material category',
  })
  name: string;
}
