import { z } from 'zod';
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
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
export class CreateMaterialDto extends createZodDto(createMaterialSchema) {
  @ApiProperty({
    example: 'Pine Wood',
    description: 'The name of the material',
  })
  name: string;

  @ApiProperty({
    example: 10,
    description: 'The quantity of the material',
    type: 'number',
  })
  quantity: number;

  @ApiProperty({
    example: 'm²',
    description: 'The unit of measurement',
  })
  unit: string;

  @ApiProperty({
    example: 25.5,
    description: 'The purchase price of the material',
    type: 'number',
  })
  purchasePrice: number;

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
