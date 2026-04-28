import { CartRepository } from '@models/index';
import { ProductService } from '@modules/product/product.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { AddToCartDto } from './dto/AddToCart.dto';
import { Types } from 'mongoose';
import { MESSAGE } from 'src/common';

@Injectable()
export class CartService {
  constructor(private readonly productService:ProductService,private readonly cartRepository:CartRepository){}
  
  async AddToCart(addToCartDto: AddToCartDto,user:any) {
    await this.productService.findOne(addToCartDto.productId);
    
    const cart = await this.cartRepository.getOne({userId:user._id});

    if(!cart) return await this.create(addToCartDto,user);
    
    const productIndex = cart.products.findIndex((product) =>  product.productId.equals(addToCartDto.productId));

    if (productIndex == -1){
      cart.products.push({productId:addToCartDto.productId,quantity:addToCartDto.quantity});
    }
    else{
      
      cart.products[productIndex].quantity = addToCartDto.quantity;
    }

    const updatedCart = await this.cartRepository.updateOne(
    { userId: user._id },
    { products: cart.products }
  );

  return updatedCart;
    
  }

  async create(addToCartDto:AddToCartDto,user:any) {
    const cart = await this.cartRepository.create({userId:user._id,products:[{productId: addToCartDto.productId,quantity: addToCartDto.quantity}]});

    return cart;
  }
  
  async findOne(user:any) {
    const cart = await this.cartRepository.getOne({userId:user._id});

    if(!cart) throw new NotFoundException(MESSAGE.cart.notFound);

    return cart;
  }

  async removeFromCart(productId: string|Types.ObjectId, user:any) {
    const productUpdated = await this.cartRepository.updateOne({userId:user._id},{"products.productId":productId});

    if (!productUpdated) throw new NotFoundException(MESSAGE.product.notFound);

    return productUpdated;
  }
  
  async clearCart(user:any){
    return await this.cartRepository.updateOne({userId:user._id}, {products:[]});
  }

}
