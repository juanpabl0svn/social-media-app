import { ApiProperty } from "@nestjs/swagger";
import { MinLength, IsEmail, IsNotEmpty } from "class-validator";

export default class LoginDto {

    @IsEmail({}, { message: 'Invalid email' })
    @IsNotEmpty({ message: 'Email is required' })
    @ApiProperty()
    email: string;

    @IsNotEmpty({ message: 'Password is required' })
    @MinLength(8, { message: 'Password must be at least 8 characters' })
    @ApiProperty()
    password: string;

    factory(data: any) {
        const login = new LoginDto();
        login.email = data.email;
        login.password = data.password;
        return login;
    }


}