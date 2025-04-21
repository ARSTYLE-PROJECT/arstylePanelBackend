import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, loginSchema } from './dto/login.dto';
import { RegisterDto, registerSchema } from './dto/register.dto';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { LoggerService } from '../common/logger/logger.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private logger: LoggerService,
  ) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // This endpoint will redirect to Google
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(@Req() req: Request) {
    try {
      if (!req.user) {
        throw new UnauthorizedException('User not found');
      }
      const user = await this.authService.handleGoogleLogin(req.user as any);
      return this.authService.login({
        email: user.email,
        id: user.id,
      });
    } catch (error) {
      this.logger.error('Google authentication failed', error);
      throw error;
    }
  }

  @Post('register')
  async register(
    @Body(new ZodValidationPipe(registerSchema)) registerDto: RegisterDto,
  ) {
    try {
      const user = await this.authService.register(registerDto);
      return this.authService.login({
        email: user.email,
        id: user.id,
      });
    } catch (error) {
      this.logger.error('Registration failed', error);
      throw error;
    }
  }

  @Post('login')
  async login(@Body(new ZodValidationPipe(loginSchema)) loginDto: LoginDto) {
    try {
      const user = await this.authService.validateUser(
        loginDto.email,
        loginDto.password,
      );
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }
      return this.authService.login({
        email: user.email,
        id: user.id,
      });
    } catch (error) {
      this.logger.error('Login failed', error);
      throw error;
    }
  }
}
