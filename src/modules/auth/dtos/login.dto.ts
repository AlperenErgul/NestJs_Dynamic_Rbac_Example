import {IsEmail, IsString, MaxLength, MinLength} from "class-validator";


export class LoginDto {

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @MaxLength(50)
    @MinLength(5)
    password: string;
}
