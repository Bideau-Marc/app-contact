import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
export class LoginDto {
    @IsEmail()
    @IsString({ message: 'Email must be a string' })
    email: string;

    @IsNotEmpty()
    @IsString({ message: 'Password must be a string' })
    password: string;
}
