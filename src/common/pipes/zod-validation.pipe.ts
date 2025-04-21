import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ZodSchema } from 'zod';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform<T>(value: unknown, metadata: ArgumentMetadata): T {
    try {
      return this.schema.parse(value) as T;
    } catch (error) {
      const logger = new LoggerService();
      logger.error('Validation failed', error);
      throw new BadRequestException('Validation failed');
    }
  }
}
