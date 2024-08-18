import { IsDate, IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {

    @IsNotEmpty({ message: 'Username is required' })
    username: string;

    @IsString({ message: 'Password must be a string' })
    @IsNotEmpty({ message: 'Password is required' })
    @MinLength(8, { message: 'Password must be at least 8 characters' })
    password: string;

    @IsEmail({}, { message: 'Invalid email' })
    @IsNotEmpty({ message: 'Email is required' })
    email: string;

    @IsString({ message: 'First name must be a string' })
    @IsNotEmpty({ message: 'First name is required' })
    first_name: string;

    @IsString({ message: 'Last name must be a string' })
    @IsNotEmpty({ message: 'Last name is required' })
    last_name: string;

    @IsNotEmpty({ message: 'Birth date is required' })
    @IsDate({ message: 'Invalid date' })
    birth_date: Date;
}
