import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ZodValidationPipe } from 'nestjs-zod';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Use ZodValidationPipe globally
  app.useGlobalPipes(new ZodValidationPipe());

  app.setGlobalPrefix('api');
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:4000',
      'http://192.168.100.203:3002',
    ],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: 'Content-Type, Accept, Authorization',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  });

  // Setup Swagger
  const config = new DocumentBuilder()
    .setTitle('ArtStyle API')
    .setDescription('ArtStyle backend API documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);

  // Sort tags alphabetically
  document.tags = document.tags?.sort((a, b) => a.name.localeCompare(b.name));

  SwaggerModule.setup('doc', app, document);

  await app.listen(process.env.API_PORT ?? 3000);
}

bootstrap()
  .then(() => {
    console.log(`Server is running on port ${process.env.API_PORT ?? 3000}`);
    console.log(`Swagger documentation available at /api/docs`);
  })
  .catch((err) => {
    console.error(err);
  });
