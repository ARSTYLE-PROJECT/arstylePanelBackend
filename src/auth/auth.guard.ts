import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

interface JwtPayload {
  userId?: string;
  sub?: string;
  isActive?: boolean;
  isEmailVerified?: boolean;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('No authorization header found');
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = this.jwtService.verify<JwtPayload>(token);
      request['userId'] = decoded.userId || decoded.sub;

      if (decoded.isActive === false) {
        throw new UnauthorizedException('This user account is deactivated.');
      }
      if (decoded.isEmailVerified === false) {
        throw new UnauthorizedException(
          'This user email address is not yet verified.',
        );
      }
      return true;
    } catch {
      throw new UnauthorizedException('Token is invalid or expired.');
    }
  }
}
