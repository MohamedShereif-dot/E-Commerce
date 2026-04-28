import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength, IsDate, Transform } from 'class-validator';

export class GoogleSignupDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  userName: string;

  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  dob: Date;
}
