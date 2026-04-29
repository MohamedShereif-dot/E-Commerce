import { Types } from "mongoose";
import { OrderStatus, PaymentMethod } from "src/common/enum";


export class Address{
    
    street:string;
    
    city:string;
    
    state:string;
    
    country:string;
    
    code:string;
    
    phoneNumber:string;
}


export class OrderProduct{
    productId:Types.ObjectId;
    
    quantity:string;
    
    price:number;
    
    
    totalPrice:number;
    
}


export class CouponDetails{
    couponId:string;
    discountAmount:number;
    code:string;
}

export class Order{
    readonly _id!: Types.ObjectId;

    userId: Types.ObjectId;

    address: Address;

    products: OrderProduct[];
    
    paymentMethod: PaymentMethod;
    
    status: OrderStatus;
    
    
    coupon: CouponDetails;

    totalAmount: number;
    
    createdAt: Date;

    updatedAt: Date;
}