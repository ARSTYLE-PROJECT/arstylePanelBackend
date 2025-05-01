import { z } from 'zod';
import { ApiProperty } from '@nestjs/swagger';
import { createZodDto } from 'nestjs-zod';

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  lastname: z.string().min(2),
  firstname: z.string().min(2),
});

export class RegisterDto extends createZodDto(registerSchema) {
  @ApiProperty({ example: 'user@example.com', description: 'User email' })
  email: string;

  @ApiProperty({ example: 'password123', description: 'User password' })
  password: string;

  @ApiProperty({ example: 'Doe', description: 'User last name' })
  lastname: string;

  @ApiProperty({ example: 'John', description: 'User first name' })
  firstname: string;
}
