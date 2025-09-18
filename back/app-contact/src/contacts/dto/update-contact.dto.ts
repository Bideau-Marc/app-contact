import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';
export class UpdateContactDto {
    @IsString()
    @IsOptional()
    @MaxLength(50, { message: 'Name is too long' })
    name?: string;
    @IsEmail()
    @IsOptional()
    email?: string;
    @IsString()
    @IsOptional()
    @MaxLength(15, { message: 'Phone number is too long' })
    phone?: string;

    @IsString()
    @IsOptional()
    @MaxLength(100, { message: 'Address is too long' })
    address?: string;
    @IsString()
    @IsOptional()
    status?: string;
}
