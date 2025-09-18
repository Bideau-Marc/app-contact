import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PasswordHashService } from 'src/password-hash/password-hash.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private passwordHashService: PasswordHashService, private prisma: PrismaService, private jwtService: JwtService) { }

    async validateUserPassword(password: string, hashedPassword: string): Promise<boolean> {
        return this.passwordHashService.comparePassword(password, hashedPassword);
    }

    async login(email: string, password: string): Promise<any> {

        console.log("try to login with", email, password);
        const token = await this.authenticateUser(email, password);
        const id = await this.prisma.employe.findUnique({ where: { email } }).then(user => user?.id);
        console.log('id :', id);

        return { access_token: token, id: id };
    }



    async authenticateUser(email: string, password: string): Promise<string> {
        const user = await this.prisma.employe.findUnique({ where: { email } });
        if (!user) throw new NotFoundException('User not found');

        const isValid = await this.validateUserPassword(password, user.password);
        if (!isValid) throw new UnauthorizedException('Invalid password');

        return this.jwtService.sign({ id: user.id });
    }


}
