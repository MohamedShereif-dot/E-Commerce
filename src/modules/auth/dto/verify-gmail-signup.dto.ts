import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class VerifyGmailSignupDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  otp: string;
}
