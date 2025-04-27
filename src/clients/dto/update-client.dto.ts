import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

export const updateClientSchema = z.object({
  type: z.string().min(1).optional(),
  title: z.string().optional(),
  lastName: z.string().min(1).optional(),
  email: z.string().email().optional(),
  phoneNumber: z.string().min(1).optional(),
  companyName: z.string().optional(),
  registrationNumber: z.string().optional(),
  vatNumber: z.string().optional(),
  street: z.string().min(1).optional(),
  city: z.string().min(1).optional(),
  postalCode: z.string().min(1).optional(),
  country: z.string().min(1).optional(),
});

@ApiExtraModels()
export class UpdateClientDto extends createZodDto(updateClientSchema) {
  @ApiProperty({
    example: 'individual',
    description: 'Type of client',
    required: false,
  })
  type?: string;

  @ApiProperty({ example: 'Mr', description: 'Client title', required: false })
  title?: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Client last name',
    required: false,
  })
  lastName?: string;

  @ApiProperty({
    example: 'client@example.com',
    description: 'Client email address',
    required: false,
  })
  email?: string;

  @ApiProperty({
    example: '+33123456789',
    description: 'Client phone number',
    required: false,
  })
  phoneNumber?: string;

  @ApiProperty({
    example: 'ABC Corporation',
    description: 'Company name',
    required: false,
  })
  companyName?: string;

  @ApiProperty({
    example: '123456789',
    description: 'Company registration number',
    required: false,
  })
  registrationNumber?: string;

  @ApiProperty({
    example: 'FR12345678900',
    description: 'VAT number',
    required: false,
  })
  vatNumber?: string;

  @ApiProperty({
    example: '123 Main St',
    description: 'Street address',
    required: false,
  })
  street?: string;

  @ApiProperty({ example: 'Paris', description: 'City', required: false })
  city?: string;

  @ApiProperty({
    example: '75001',
    description: 'Postal code',
    required: false,
  })
  postalCode?: string;

  @ApiProperty({ example: 'France', description: 'Country', required: false })
  country?: string;
}
