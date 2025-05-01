import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

export const updateDocumentSchema = z.object({
  url: z.string().url().optional(),
  type: z.string().min(1).optional(),
});

@ApiExtraModels()
export class UpdateDocumentDto extends createZodDto(updateDocumentSchema) {
  @ApiProperty({
    example: 'https://example.com/documents/file.pdf',
    description: 'The URL of the document',
    required: false,
  })
  url?: string;

  @ApiProperty({
    example: 'invoice',
    description: 'The type of document',
    required: false,
  })
  type?: string;
}
