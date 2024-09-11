import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const port = process.env.PORT || '3000';
  const app = await NestFactory.create( AppModule );

  app.useGlobalPipes(
    new ValidationPipe( {
      whitelist: true,
      forbidNonWhitelisted: true,
    } ),
  );

  app.enableCors();

  await app.listen( port );

  console.log( `Server run on port ${ port }` );
}

bootstrap();
