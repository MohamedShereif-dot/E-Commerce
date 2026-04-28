import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserMongoModule } from '@shared/index';
import { BrandController } from './brand.controller';
import { BrandService } from './brand.service';
import { BrandFactoryService } from './factory';
import { Brand } from './entities/brand.entity';
import { BrandRepository, brandSchema } from '@models/index';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    UserMongoModule, 
    MongooseModule.forFeature([{name:Brand.name,schema:brandSchema},])
  ],
  controllers: [BrandController],
  providers: [BrandService,BrandFactoryService,BrandRepository,JwtService],
  exports: [BrandService,BrandFactoryService,BrandRepository,JwtService],
})

export class BrandModule { }
