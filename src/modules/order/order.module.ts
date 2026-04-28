import { Order, OrderRepository, orderSchema, ProductRepository } from '@models/index';
import { AuthModule } from '@modules/auth/auth.module';
import { CartModule } from '@modules/cart/cart.module';
import { CartService } from '@modules/cart/cart.service';
import { ProductModule } from '@modules/product/product.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { JwtService } from '@nestjs/jwt';
import { UserMongoModule } from '@shared/index';

@Module({
  imports: [
    AuthModule,
    CartModule,
    ProductModule,
    UserMongoModule,
    MongooseModule.forFeature([{
      name:Order.name,
      schema:orderSchema
    }])
  ],
  controllers: [OrderController],
  providers: [OrderService,OrderRepository],
  exports: [OrderService,OrderRepository],
})
export class OrderModule {}
