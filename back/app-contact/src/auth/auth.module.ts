import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { PasswordHashService } from 'src/password-hash/password-hash.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwtStrategy';
import { ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from './JwtAuthGuard';
@Module({
    imports: [
        JwtModule.registerAsync(
            {
                useFactory: async (configService: ConfigService) => {
                    return {
                        secret: configService.get<string>('JWT_SECRET'),
                        signOptions: { expiresIn: '24h' },
                    }
                },
                inject: [ConfigService],

            })
    ],
    providers: [AuthService, JwtAuthGuard, PasswordHashService, PrismaService, JwtStrategy],
    controllers: [AuthController]
})
export class AuthModule { }