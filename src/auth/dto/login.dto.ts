import { z } from 'zod';
import { ApiProperty } from '@nestjs/swagger';
import { createZodDto } from 'nestjs-zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const loginOrRegisterWithGoogleSchema = z.object({
  idToken: z.string(),
});

export class LoginDto extends createZodDto(loginSchema) {
  @ApiProperty({ example: 'user@example.com', description: 'User email' })
  email: string;

  @ApiProperty({ example: 'password123', description: 'User password' })
  password: string;
}

export class LoginOrRegisterWithGoogleAuthDto extends createZodDto(
  loginOrRegisterWithGoogleSchema,
) {
  @ApiProperty({
    example: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjFlOWdkazcifQ...',
    description: 'Google ID token',
  })
  idToken: string;
}
