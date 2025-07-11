import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import superadminCreate from './core/script/adminGenerate';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('HIES API')
    .setVersion('1.1')
    .addBearerAuth()
    .build() 
  const dokument = SwaggerModule.createDocument(app,swaggerConfig)
  SwaggerModule.setup('/api',app,dokument)

  app.useGlobalFilters(new AllExceptionsFilter());
  await superadminCreate()
  await app.listen(process.env.PORT ?? 3000);
  app.enableCors({
    origin: true,      // barcha domenlarga ruxsat
    methods: '*',      // barcha HTTP methodlarga ruxsat
    credentials: true, // agar cookie ishlatilsa
  });
  console.log(`http://localhost:${process.env.PORT || 3000}/api`)
}
bootstrap();
