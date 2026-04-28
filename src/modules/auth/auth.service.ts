import { ConflictException, Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { MESSAGE } from 'src/common';
import { sendMail } from 'src/common/helpers';
import generateOTP from 'src/common/helpers/otp.helpers';
import { Customer, CustomerRepository } from 'src/models';
import { ForgetPasswordDTO } from './dto/forgetPassword.dto';
import { LoginDTO } from './dto/login.dto';
import { ResetPasswordDTO } from './dto/reset-password.dto';
import { VerifyOtpDTO } from './dto/verify-otp.dto';

@Injectable()
export class AuthService {
  constructor(private readonly configService: ConfigService, private readonly customerRepository: CustomerRepository, private readonly jwtService: JwtService) { }

  async register(customer: Customer) {
    const customerExist = await this.customerRepository.getOne({ email: customer.email });
    if (customerExist) throw new ConflictException(MESSAGE.user.alreadyExist);

    const createdCustomer = await this.customerRepository.create(customer);
    // send email

    await sendMail({ to: customer.email, subject: "Confirm email", html: `<h3>Your otp is ${customer.otp}</h3>` });

    const { otpExpiry, otp, password, ...customerObj } = JSON.parse(JSON.stringify(createdCustomer));


    return customerObj as Customer;
  }

  async login(loginDTO: LoginDTO) {
    const customerExist = await this.customerRepository.getOne({
      email: loginDTO.email,
    });

    const match = await bcrypt.compare(loginDTO.password, customerExist?.password || '');
    if (!customerExist || !match) throw new UnauthorizedException('invalid credentials');

    // generate token
  const token = this.jwtService.sign({ _id: customerExist._id, role: "Customer", email: customerExist.email }, {secret:this.configService.get('access').jwt_secret,expiresIn:'1d'});
  return token;
  }

  async forgetPassword(forgetPasswordDTO: ForgetPasswordDTO) {
    const emailExist = await this.customerRepository.getOne({ email: forgetPasswordDTO.email });

    if (!emailExist) throw new UnauthorizedException("If this email is registered, you will receive a password reset link.");

    // Generate OTP
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    // Update customer with OTP
    await this.customerRepository.updateOne(
      { _id: emailExist._id },
      { otp, otpExpiry }
    );

    // Send email with OTP
    await sendMail({
      to: forgetPasswordDTO.email,
      subject: "Password Reset Request",
      html: `
        <h3>Password Reset Request</h3>
        <p>Your OTP for password reset is: <strong>${otp}</strong></p>
        <p>This OTP will expire in 10 minutes.</p>
        <p>If you didn't request a password reset, please ignore this email.</p>
      `
    });

    return { message: "Password reset OTP sent to your email", success: true };
  }

  async verifyOtp(verifyOtpDTO: VerifyOtpDTO) {
    const customer = await this.customerRepository.getOne({ email: verifyOtpDTO.email });

    if (!customer) throw new UnauthorizedException("Customer not found");

    // Check if OTP matches
    if (customer.otp !== verifyOtpDTO.otp) {
      throw new UnauthorizedException("Invalid OTP");
    }

    // Check if OTP has expired
    if (new Date() > customer.otpExpiry) {
      throw new UnauthorizedException("OTP has expired");
    }

    return { message: "OTP verified successfully", success: true };
  }

  async resetPassword(resetPasswordDTO: ResetPasswordDTO) {
    const customer = await this.customerRepository.getOne({ email: resetPasswordDTO.email });

    if (!customer) throw new UnauthorizedException("Customer not found");

    // Check if OTP matches
    if (customer.otp !== resetPasswordDTO.otp) {
      throw new UnauthorizedException("Invalid OTP");
    }

    // Check if OTP has expired
    if (new Date() > customer.otpExpiry) {
      throw new UnauthorizedException("OTP has expired");
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(resetPasswordDTO.newPassword, 10);

    // Update password and clear OTP
    const updatedCustomer = await this.customerRepository.updateOne(
      { _id: customer._id },
      { password: hashedPassword, otp: null, otpExpiry: null },
      { new: true }
    );

    const { otp, otpExpiry, password, ...customerObj } = JSON.parse(JSON.stringify(updatedCustomer));

    return { message: "Password reset successfully", success: true, data: customerObj };
  }
}

