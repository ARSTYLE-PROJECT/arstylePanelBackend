import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoggerService } from '../common/logger/logger.service';
import * as bcrypt from 'bcrypt';
import { LoginOrRegisterWithGoogleAuthDto } from './dto/login.dto';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private logger: LoggerService,
  ) {}

  async loginOrRegisterWithGoogle(dto: LoginOrRegisterWithGoogleAuthDto) {
    const { idToken } = dto;

    try {
      const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
      const ticket = await client.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();

      if (
        !payload ||
        !payload.email ||
        !payload.family_name ||
        !payload.given_name
      ) {
        throw new UnauthorizedException('Invalid Google ID token');
      }

      const u = await this.prisma.user.findUnique({
        where: {
          email: payload?.email?.toLocaleLowerCase(),
        },
      });

      if (u) {
        if (!u.googleId) {
          await this.prisma.user.update({
            where: {
              id: u.id,
            },
            data: {
              googleId: payload?.sub,
            },
          });
        }
      }

      const user = await this.prisma.user.create({
        data: {
          email: payload.email.toLocaleLowerCase(),
          lastname: payload.family_name,
          firstname: payload.given_name,
          password: '',
          googleId: payload.sub,
        },
      });
      const jwt = this.jwtService.sign({
        userId: user.id,
      });

      return {
        statusCode: 201,
        jwt,
        message: 'User registered successfully',
      };
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
          lastname: registerDto.lastname,
          firstname: registerDto.firstname,
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
