import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PrismaService } from './prisma/prisma.service';
import { ContactsModule } from './contacts/contacts.module';
import { EmployeModule } from './employe/employe.module';
import { AuthModule } from './auth/auth.module';
import { PasswordHashService } from './password-hash/password-hash.service';
import { RemoveSensitiveDataInterceptorService } from './remove-sensitive-data-interceptor/remove-sensitive-data-interceptor.service';
import { RateLimiterModule } from 'nestjs-rate-limiter';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/JwtAuthGuard';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ContactsModule, EmployeModule, AuthModule, RateLimiterModule.register({
    points: 5, // Number of points
    duration: 1, // Duration in seconds
  }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, RemoveSensitiveDataInterceptorService, { provide: APP_GUARD, useClass: JwtAuthGuard }],


})
export class AppModule { }
