import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import superadminCreate from './core/script/adminGenerate';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🔁 CORS SOZLAMA BIRINCHI TURISHI KERAK
    app.enableCors();

  // Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('HIES API')
    .setVersion('1.1')
    .addBearerAuth()
    .build();
  const dokument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/api', app, dokument);

  // Global Exception
  app.useGlobalFilters(new AllExceptionsFilter());

  // Superadmin yaratish
  await superadminCreate();

  const PORT = process.env.PORT || 3000;

  app.enableCors()
  // 🔚 YAKUNIDA LISTEN
  await app.listen(PORT, '0.0.0.0');
  console.log(`http://localhost:${PORT}/api`);
}
bootstrap();


