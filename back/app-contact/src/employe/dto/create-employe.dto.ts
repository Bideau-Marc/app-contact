import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength, MaxLength } from "class-validator";

export class CreateEmployeeDto {
    @IsString()
    @IsOptional()
    @MaxLength(50, { message: 'Name is too long' })
    name?: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @MinLength(6, { message: 'Password is too short' })
    @MaxLength(100, { message: 'Password is too long' })
    password: string;
}