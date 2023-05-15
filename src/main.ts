import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const PORT = Number(process.env.PORT) || 5010;

function addSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Diabetes API v1')
    .setDescription(
      'The purpose of this API is to manage and store all dosis administrated to Lola.',
    )
    .setVersion('1.0')
    .build();

  //* add swagger to app.
  const document = SwaggerModule.createDocument(app, config);

  //* init swagger
  SwaggerModule.setup('/docs', app, document, {
    swaggerOptions: {
      deepScanRoutes: true,
    },
  });

  return app;
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS configuration...
  app.enableCors({
    origin: '*',
    methods: ['POST', 'PUT', 'DELETE', 'GET'],
    credentials: true,
  });

  // Pipelines for class-validator...
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  // Adds swagger support...
  addSwagger(app);

  await app.listen(PORT);
}
bootstrap();
