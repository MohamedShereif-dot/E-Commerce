import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GoogleAuthController } from './google-auth.controller';
import { GoogleAuthService } from './google-auth.service';
import { Customer, CustomerRepository, customerSchema, User, userSchema } from 'src/models';
import { MongooseModule } from '@nestjs/mongoose';
import { UserMongoModule } from 'src/shared';
import { AuthFactoryService } from './factory';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
  imports:[
    UserMongoModule,
    PassportModule.register({ defaultStrategy: 'jwt' })
  ],
  controllers: [AuthController, GoogleAuthController],
  providers: [
    AuthService,
    AuthFactoryService,
    JwtService,
    GoogleAuthService,
    GoogleStrategy
  ],
  exports: [AuthService, AuthFactoryService, JwtService, GoogleAuthService],
})
export class AuthModule {}