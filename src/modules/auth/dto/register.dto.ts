import { Transform } from "class-transformer";
import { IsDate, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class RegisterDTO{
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(20)
    userName: string;
    @IsString()
    @IsNotEmpty()
    email: string;
    @IsString()
    @IsNotEmpty()
    password: string;
    @IsNotEmpty()
    @Transform(({value})=>(new Date(value)))
    @IsDate()
    dob: Date;
}