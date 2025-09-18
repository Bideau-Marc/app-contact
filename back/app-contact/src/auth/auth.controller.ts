import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { LoginDto } from './login.dto';
import { AuthService } from './auth.service';
import { RateLimiterGuard } from 'nestjs-rate-limiter';
import { Public } from 'src/decorator/public.decorator';
import { Response } from 'express';
import { Get, Param, Req, Res } from '@nestjs/common/decorators';
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    @Public()
    @Post('login')
    async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
        try {
            const { access_token, id } = await this.authService.login(loginDto.email, loginDto.password);
            res.cookie('auth_token', access_token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
            });
            return { id };
        } catch (error) {
            // Le filtre d'exception global s'occupe de formater la réponse
            throw error;
        }
    }

    @Get('me')
    getMe() {
        // JwtAuthGuard a déjà validé le cookie et injecté req.user
        return 'je suis un chimpanzé';
    }
}
