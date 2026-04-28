import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { ProductModule } from '@modules/product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, CartRepository, cartSchema, UserRepository } from '@models/index';
import { AuthModule } from '@modules/auth/auth.module';
import { UserMongoModule } from '@shared/index';

@Module({
  imports: [AuthModule,ProductModule,UserMongoModule,MongooseModule.forFeature([{name:Cart.name,schema:cartSchema}])],
  controllers: [CartController],
  providers: [CartService,CartRepository],
  exports: [CartService,CartRepository],
})
export class CartModule {}
