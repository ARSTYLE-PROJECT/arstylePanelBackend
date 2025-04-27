import { z } from 'zod';
import { ApiProperty } from '@nestjs/swagger';
import { createZodDto } from 'nestjs-zod';

export const createUserSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
    lastname: z.string().min(2),
    firstname: z.string().min(2),
  })
  .strict();

export class CreateUserDto extends createZodDto(createUserSchema) {
  @ApiProperty({
    example: 'user@example.com',
    description: 'User email address',
  })
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'User password (min 6 characters)',
  })
  password: string;

  @ApiProperty({
    example: 'Doe',
    description: 'User last name (min 2 characters)',
  })
  lastname: string;

  @ApiProperty({
    example: 'John',
    description: 'User first name (min 2 characters)',
  })
  firstname: string;
}
