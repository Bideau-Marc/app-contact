import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RemoveSensitiveDataInterceptorService } from './remove-sensitive-data-interceptor/remove-sensitive-data-interceptor.service';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import * as bcrypt from 'bcrypt';
import * as cookieParser from 'cookie-parser';
import { HttpExceptionFilter } from './http-exception-filter/http-exception-filter.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new RemoveSensitiveDataInterceptorService());
  app.useGlobalPipes(new ValidationPipe());
  app.use(helmet());
  console.log('mdp hashé : ', bcrypt.hashSync('mdp', 10));
  app.enableCors({
    origin: 'http://localhost:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.use(cookieParser())
  app.useGlobalFilters(new HttpExceptionFilter)
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
