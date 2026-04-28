import { Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Customer, CustomerRepository } from 'src/models';
import { AuthFactoryService } from './factory';
import { sendMail } from 'src/common/helpers';
import generateOTP from 'src/common/helpers/otp.helpers';

@Injectable()
export class GoogleAuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly customerRepository: CustomerRepository,
    private readonly jwtService: JwtService,
    private readonly authFactoryService: AuthFactoryService,
  ) {}

  async validateGoogleUser(profile: any) {
    const { googleId, email, firstName, lastName, picture } = profile;

    // Check if user already exists with this email
    let customer = await this.customerRepository.getOne({ email });

    if (customer) {
      // If customer exists but doesn't have googleId, link the accounts
      if (!customer.googleId) {
        await this.customerRepository.updateOne(
          { _id: customer._id },
          { googleId, isVerified: true }
        );
      }
      return customer;
    }

    // Create new customer from Google profile
    const newCustomer = new Customer();
    newCustomer.userName = `${firstName} ${lastName}`.replace(/\s+/g, '').toLowerCase();
    newCustomer.email = email;
    newCustomer.googleId = googleId;
    newCustomer.isVerified = true; // Google accounts are pre-verified
    newCustomer.dob = new Date(); // Default DOB, can be updated later

    // Generate a random password for Google users (they won't use it)
    const randomPassword = Math.random().toString(36) + Math.random().toString(36);
    newCustomer.password = await this.authFactoryService.createCustomer({
      userName: newCustomer.userName,
      email: newCustomer.email,
      password: randomPassword,
      dob: newCustomer.dob,
    }).then(customer => customer.password);

    const createdCustomer = await this.customerRepository.create(newCustomer);
    return createdCustomer;
  }

  async loginWithGoogle(profile: any) {
    const customer = await this.validateGoogleUser(profile);

    // Generate JWT token
    const token = this.jwtService.sign(
      { _id: customer._id, role: "Customer", email: customer.email },
      { secret: this.configService.get('access').jwt_secret, expiresIn: '1d' }
    );

    const { password, otp, otpExpiry, ...customerObj } = JSON.parse(JSON.stringify(customer));

    return {
      message: 'Google login successful',
      success: true,
      data: {
        customer: customerObj,
        token
      }
    };
  }

  async signupWithGoogle(email: string, userName: string, dob: Date) {
    // Check if user already exists
    const existingCustomer = await this.customerRepository.getOne({ email });
    if (existingCustomer) {
      throw new ConflictException('Email already registered');
    }

    // Create new customer
    const newCustomer = new Customer();
    newCustomer.userName = userName;
    newCustomer.email = email;
    newCustomer.dob = dob;
    newCustomer.isVerified = false;
    
    // Generate OTP for email verification
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    newCustomer.otp = otp;
    newCustomer.otpExpiry = otpExpiry;

    // Generate a temporary password
    const tempPassword = Math.random().toString(36) + Math.random().toString(36);
    newCustomer.password = await this.authFactoryService.createCustomer({
      userName,
      email,
      password: tempPassword,
      dob,
    }).then(customer => customer.password);

    const createdCustomer = await this.customerRepository.create(newCustomer);

    // Send verification email with OTP
    await sendMail({
      to: email,
      subject: 'Verify Your Gmail Signup',
      html: `
        <h2>Welcome to Our E-commerce Store!</h2>
        <p>Thank you for signing up with Gmail!</p>
        <p>Your OTP for email verification is: <strong>${otp}</strong></p>
        <p>This OTP will expire in 10 minutes.</p>
        <p>Please use this OTP to complete your registration.</p>
      `
    });

    const { password, otp: returnOtp, otpExpiry: returnExpiry, ...customerObj } = JSON.parse(JSON.stringify(createdCustomer));

    return {
      message: 'Signup successful. Please verify your email with the OTP sent to your inbox.',
      success: true,
      data: customerObj
    };
  }

  async verifyGmailSignup(email: string, otp: string) {
    const customer = await this.customerRepository.getOne({ email });

    if (!customer) {
      throw new BadRequestException('Customer not found');
    }

    if (customer.otp !== otp) {
      throw new BadRequestException('Invalid OTP');
    }

    if (new Date() > customer.otpExpiry) {
      throw new BadRequestException('OTP has expired');
    }

    // Mark as verified
    const verifiedCustomer = await this.customerRepository.updateOne(
      { _id: customer._id },
      { isVerified: true, otp: null, otpExpiry: null },
      { new: true }
    );

    // Generate JWT token
    const token = this.jwtService.sign(
      { _id: verifiedCustomer._id, role: 'Customer', email: verifiedCustomer.email },
      { secret: this.configService.get('access').jwt_secret, expiresIn: '1d' }
    );

    const { password, otp: returnOtp, otpExpiry: returnExpiry, ...customerObj } = JSON.parse(JSON.stringify(verifiedCustomer));

    return {
      message: 'Email verified successfully',
      success: true,
      data: {
        customer: customerObj,
        token
      }
    };
  }

  getGoogleAuthUrl(): string {
    const clientId = this.configService.get('google.clientId');
    const redirectUri = encodeURIComponent(this.configService.get('google.callbackUrl'));
    const scope = encodeURIComponent('openid email profile');

    return `https://accounts.google.com/o/oauth2/v2/auth?` +
           `client_id=${clientId}&` +
           `redirect_uri=${redirectUri}&` +
           `response_type=code&` +
           `scope=${scope}&` +
           `access_type=offline`;
  }
}