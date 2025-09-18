import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';
export class CreateContactDto {
    @IsString()
    @IsOptional()
    @MaxLength(50, { message: 'Name is too long' })
    readonly name?: string;

    @IsEmail()
    readonly email: string;

    @IsString()
    @IsOptional()
    @MaxLength(15, { message: 'Phone number is too long' })
    readonly phone?: string;

    @IsString()
    @IsOptional()
    @MaxLength(100, { message: 'Address is too long' })
    readonly address?: string;

    @IsString()
    @IsOptional()
    readonly status?: string;
}
