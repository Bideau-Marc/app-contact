// auth/jwt.strategy.ts 
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable() export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET'),
        });
        console.log('JWT Secret:', this.configService.get<string>('JWT_SECRET'), this.configService.get<string>('JWT_SECRET')?.length); // réponsse : your_jwt_secret

    }

    async validate(payload: any) {
        // Cette data sera disponible dans req.user
        return { id: payload.sub, email: payload.email };
    }
}