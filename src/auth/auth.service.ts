import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoggerService } from '../common/logger/logger.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private logger: LoggerService,
  ) {}

  async handleGoogleLogin(profile: {
    email: string;
    name: string;
    picture?: string;
  }) {
    try {
      let user = await this.prisma.user.findUnique({
        where: { email: profile.email },
      });

      if (!user) {
        user = await this.prisma.user.create({
          data: {
            email: profile.email,
            name: profile.name,
            avatar: profile.picture,
            password: await bcrypt.hash(
              Math.random().toString(36).slice(-8),
              10,
            ),
          },
        });
      }

      return user;
    } catch (error) {
      this.logger.error('Google login failed', error);
      throw error;
    }
  }

  async validateUser(email: string, password: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email },
      });

      if (user && (await bcrypt.compare(password, user.password))) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = user;
        return result;
      }
      return null;
    } catch (error) {
      this.logger.error('User validation failed', error);
      throw error;
    }
  }

  login(user: { email: string; id: string }) {
    try {
      const payload = { email: user.email, sub: user.id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      this.logger.error('Login failed', error);
      throw error;
    }
  }

  async register(registerDto: RegisterDto) {
    try {
      const hashedPassword = await bcrypt.hash(registerDto.password, 10);
      const user = await this.prisma.user.create({
        data: {
          email: registerDto.email,
          name: registerDto.name,
          password: hashedPassword,
        },
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    } catch (error) {
      this.logger.error('Registration failed', error);
      throw error;
    }
  }
}
