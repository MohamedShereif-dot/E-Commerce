import { Module } from '@nestjs/common';

import devConfig from '@config/dev.config';
import { AuthModule } from '@modules/auth/auth.module';
import { BrandModule } from '@modules/brand/brand.module';
import { CategoryModule } from '@modules/category/category.module';
import { ProductModule } from '@modules/product/product.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Admin, adminSchema, Customer, customerSchema, Seller, sellerSchema, User, userSchema } from './models';

@Module({
  imports: [ConfigModule.forRoot({ load: [devConfig], isGlobal: true }), MongooseModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      uri: configService.get('db').url as string
    }),
  }),

  MongooseModule.forFeature([{
    name: User.name, schema: userSchema,
    discriminators: [
      { name: Admin.name, schema: adminSchema },
      { name: Seller.name, schema: sellerSchema },
      { name: Customer.name, schema: customerSchema },
    ]
  }]),
    AuthModule, BrandModule, CategoryModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
