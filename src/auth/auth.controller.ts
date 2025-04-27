import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, LoginOrRegisterWithGoogleAuthDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { LoggerService } from '../common/logger/logger.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private logger: LoggerService,
  ) {}

  @ApiOperation({ summary: 'Login or register with Google' })
  @ApiResponse({
    status: 201,
    description: 'User registered/logged in successfully',
  })
  @ApiResponse({ status: 403, description: 'Invalid Google ID token' })
  @Post('login-register-with-google')
  async registerWithGoogle(@Body() dto: LoginOrRegisterWithGoogleAuthDto) {
    try {
      return await this.authService.loginOrRegisterWithGoogle(dto);
    } catch (error) {
      this.logger.error('Google login failed', error);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({
    status: 400,
    description: 'Invalid data or email already in use',
  })
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
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

  @ApiOperation({ summary: 'Login with email and password' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
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
