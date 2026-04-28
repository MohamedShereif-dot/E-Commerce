import { Body, Controller, Post } from '@nestjs/common';
import { MESSAGE } from 'src/common';
import { AuthService } from './auth.service';
import { ForgetPasswordDTO } from './dto/forgetPassword.dto';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { ResetPasswordDTO } from './dto/reset-password.dto';
import { VerifyOtpDTO } from './dto/verify-otp.dto';
import { AuthFactoryService } from './factory';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly authFactoryService: AuthFactoryService) { }

  @Post('register')
  async register(@Body() registerDTO: RegisterDTO) {
    const customer = await this.authFactoryService.createCustomer(registerDTO);
    const createdCustomer = await this.authService.register(customer);
    return { message: MESSAGE.customer.created, success: true, data: createdCustomer}
  }
  
  @Post('login')
  async login(@Body() loginDTO:LoginDTO){
    const token = await this.authService.login(loginDTO);
    return {meassage:'login successfully',success: true,data:{token}};
  }
  
  @Post('forget-password')
  async forgetPassword(@Body() forgetPasswordDTO: ForgetPasswordDTO) {
    const result = await this.authService.forgetPassword(forgetPasswordDTO);
    return result;
  }

  @Post('verify-otp')
  async verifyOtp(@Body() verifyOtpDTO: VerifyOtpDTO) {
    const result = await this.authService.verifyOtp(verifyOtpDTO);
    return result;
  }

  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDTO: ResetPasswordDTO) {
    const result = await this.authService.resetPassword(resetPasswordDTO);
    return result;
  }
}
