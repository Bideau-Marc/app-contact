import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';
export class UpdateEmployeeDto {
    @IsString()
    @IsOptional()
    @MaxLength(50, { message: 'Name is too long' })
    name?: string;

    @IsEmail()
    @IsOptional()
    email?: string;

    @IsString()
    @IsOptional()
    @MaxLength(100, { message: 'Password is too long' })
    password?: string;

    @IsOptional()
    creationDate?: Date;
}