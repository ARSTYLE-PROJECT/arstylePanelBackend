import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

export const createDocumentSchema = z.object({
  url: z.string().url(),
  type: z.string().min(1),
});

@ApiExtraModels()
export class CreateDocumentDto extends createZodDto(createDocumentSchema) {
  @ApiProperty({
    example: 'https://example.com/documents/file.pdf',
    description: 'The URL of the document',
  })
  url: string;

  @ApiProperty({
    example: 'invoice',
    description: 'The type of document',
  })
  type: string;
}
