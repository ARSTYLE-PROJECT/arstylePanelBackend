import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

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
export class UpdateMaterialDto extends createZodDto(updateMaterialSchema) {
  @ApiProperty({
    example: 'Pine Wood',
    description: 'The name of the material',
    required: false,
  })
  name?: string;

  @ApiProperty({
    example: 10,
    description: 'The quantity of the material',
    type: 'number',
    required: false,
  })
  quantity?: number;

  @ApiProperty({
    example: 'm²',
    description: 'The unit of measurement',
    required: false,
  })
  unit?: string;

  @ApiProperty({
    example: 25.5,
    description: 'The purchase price of the material',
    type: 'number',
    required: false,
  })
  purchasePrice?: number;

  @ApiProperty({
    example: 1,
    description: 'The ID of the stock supplier',
    type: 'number',
    required: false,
  })
  stockSupplierId?: number;

  @ApiProperty({
    example: 1,
    description: 'The ID of the material category',
    type: 'number',
    required: false,
  })
  categoryId?: number;

  @ApiProperty({
    example: 1,
    description: 'The ID of the supplier',
    type: 'number',
    required: false,
  })
  supplierId?: number;
}
