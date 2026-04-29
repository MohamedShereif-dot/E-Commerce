import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserMongoModule } from 'src/shared';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthFactoryService } from './factory';

@Module({
  imports:[
    UserMongoModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthFactoryService,
    JwtService
  ],
  exports: [AuthService, AuthFactoryService, JwtService],
})
export class AuthModule {}