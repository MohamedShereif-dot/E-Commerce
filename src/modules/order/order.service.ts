import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CartService } from '@modules/cart/cart.service';
import { Cart, OrderRepository, ProductRepository } from '@models/index';
import { Types } from 'mongoose';
import { OrderStatus } from 'src/common/enum';

@Injectable()
export class OrderService {
  constructor(private readonly cartService:CartService, private readonly productRepository:ProductRepository, private readonly orderRepository:OrderRepository){}
  
  async create(createOrderDto: CreateOrderDto,user:any) {
    const cart = await this.cartService.findOne(user);
    
    const {successProducts,failProducts} = await this.productExistance(cart);

    if(failProducts.length>0){
      return failProducts;
    }

    const order = await this.orderRepository.create({
      userId:user._id,
      products:successProducts,
      address:createOrderDto.address,
      paymentMethod:createOrderDto.paymentMethod,
      coupon:createOrderDto.coupon,
      totalAmount:successProducts.reduce((acc,cur)=> acc + cur.totalPrice,0,),
      createdAt:new Date(),
      updatedAt:new Date(),
      status: OrderStatus.PENDING
    })

    return order;
  }

  async productExistance(cart:Cart){

    let successProducts : {
      productId:Types.ObjectId,
      quantity:number,
      price:number,
      discount:number,
      totalPrice:number,
    }[]=[];

    let failProducts : {
      productId:Types.ObjectId,
      reason:string
    }[]=[];

    for(const product of cart.products){
      const productExist = await this.productRepository.getOne({_id:product.productId});

      if(!productExist){
        failProducts.push({productId:product.productId, reason:"Product not found"});
      }
      else if(product.quantity > productExist.stock){
        failProducts.push({productId:product.productId, reason:"Product stock not enough"});
      }
      else if(productExist){
        successProducts.push({
          productId:product.productId,
          quantity:product.quantity,
          price:productExist.finalPrice,
          discount:productExist.discountAmount,
          totalPrice:productExist.finalPrice * product.quantity,

        });
      }

    }

    return {failProducts,successProducts};

  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
