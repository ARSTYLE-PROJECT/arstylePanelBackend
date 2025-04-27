import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

export const createClientSchema = z.object({
  type: z.string().min(1),
  title: z.string().optional(),
  lastName: z.string().min(1),
  email: z.string().email(),
  phoneNumber: z.string().min(1),
  companyName: z.string().optional(),
  registrationNumber: z.string().optional(),
  vatNumber: z.string().optional(),
  street: z.string().min(1),
  city: z.string().min(1),
  postalCode: z.string().min(1),
  country: z.string().min(1),
});

@ApiExtraModels()
export class CreateClientDto extends createZodDto(createClientSchema) {
  @ApiProperty({ example: 'individual', description: 'Type of client' })
  type: string;

  @ApiProperty({ example: 'Mr', description: 'Client title', required: false })
  title?: string;

  @ApiProperty({ example: 'Doe', description: 'Client last name' })
  lastName: string;

  @ApiProperty({
    example: 'client@example.com',
    description: 'Client email address',
  })
  email: string;

  @ApiProperty({ example: '+33123456789', description: 'Client phone number' })
  phoneNumber: string;

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

  @ApiProperty({ example: '123 Main St', description: 'Street address' })
  street: string;

  @ApiProperty({ example: 'Paris', description: 'City' })
  city: string;

  @ApiProperty({ example: '75001', description: 'Postal code' })
  postalCode: string;

  @ApiProperty({ example: 'France', description: 'Country' })
  country: string;
}
