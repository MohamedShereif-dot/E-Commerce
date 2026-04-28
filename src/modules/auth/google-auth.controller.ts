import { Controller, Get, Post, Req, Res, UseGuards, Body } from '@nestjs/common';
import { GoogleAuthService } from './google-auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { GoogleSignupDTO } from './dto/google-signup.dto';
import { VerifyGmailSignupDTO } from './dto/verify-gmail-signup.dto';

@Controller('auth/google')
export class GoogleAuthController {
  constructor(private readonly googleAuthService: GoogleAuthService) {}

  @Get()
  async googleAuth(@Res() res: Response) {
    const authUrl = this.googleAuthService.getGoogleAuthUrl();
    res.redirect(authUrl);
  }

  @Get('callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(@Req() req: any, @Res() res: Response) {
    try {
      const result = await this.googleAuthService.loginWithGoogle(req.user);
      // In a real application, you might want to redirect to frontend with token
      // For API response, return JSON
      res.json(result);
    } catch (error) {
      res.status(500).json({
        message: 'Google authentication failed',
        success: false,
        error: error.message
      });
    }
  }

  @Post('login')
  @UseGuards(AuthGuard('google'))
  async googleLogin(@Req() req: any) {
    return this.googleAuthService.loginWithGoogle(req.user);
  }

  @Post('signup')
  async gmailSignup(@Body() googleSignupDTO: GoogleSignupDTO) {
    const result = await this.googleAuthService.signupWithGoogle(
      googleSignupDTO.email,
      googleSignupDTO.userName,
      new Date(googleSignupDTO.dob)
    );
    return result;
  }

  @Post('verify-signup')
  async verifyGmailSignup(@Body() verifyGmailSignupDTO: VerifyGmailSignupDTO) {
    const result = await this.googleAuthService.verifyGmailSignup(
      verifyGmailSignupDTO.email,
      verifyGmailSignupDTO.otp
    );
    return result;
  }
}