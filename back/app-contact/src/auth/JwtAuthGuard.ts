import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublic) {
            return true;
        }

        return super.canActivate(context);
    }

    // 👉 Override pour dire à Passport où trouver le token
    getRequest(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();

        // Récupère ton cookie "auth_token"
        const token = request.cookies?.['auth_token'];
        if (token) {
            // On injecte le token dans le header pour que Passport JWT le reconnaisse
            request.headers.authorization = `Bearer ${token}`;
        }

        return request;
    }
}
