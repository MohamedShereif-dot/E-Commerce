import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class ResetPasswordDTO {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    otp: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    newPassword: string;
}
