import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { Types } from 'mongoose';
import { Auth, User } from 'src/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/AddToCart.dto';

@Auth(['Customer','Admin'])
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  AddToCart(@Body() addToCartDto: AddToCartDto,@User() user) {
    return this.cartService.AddToCart(addToCartDto,user);
  }

  @Delete(':id')
  removeFromCart(@Param('productId') productId: string|Types.ObjectId, @User() user:any) {
    return this.cartService.removeFromCart(productId,user);
  }
  
}
