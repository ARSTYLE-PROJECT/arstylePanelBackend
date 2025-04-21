import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiExtraModels } from '@nestjs/swagger';

export const createChargeSchema = z.object({
  type: z.string().min(1),
});

@ApiExtraModels()
export class CreateChargeDto extends createZodDto(createChargeSchema) {}
