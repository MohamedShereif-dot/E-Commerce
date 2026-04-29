import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { OrderStatus, PaymentMethod } from "src/common/enum";

@Schema({timestamps:true})
export class Address{
    
    @Prop({type:String,required:true})
    street:string;
    
    @Prop({type:String,required:true})
    city:string;
    
    @Prop({type:String,required:true})
    state:string;
    
    @Prop({type:String,required:true})
    country:string;
    
    @Prop({type:String,required:true})
    code:string;
    
    @Prop({type:String,required:true})
    phoneNumber:string;
}

@Schema({timestamps:true})
export class OrderProduct{
    @Prop({type:Types.ObjectId,ref:'Product',required:true})
    productId:Types.ObjectId;
    
    @Prop({type:Number,default:'1'})
    quantity:number;
    
    @Prop({type:Number,required:true})
    price:number;
    
    @Prop({type:Number})
    discount:number;
    
    @Prop({type:Number,required:true})
    totalPrice:number;
    
}

@Schema({timestamps:true})
export class CouponDetail{
    @Prop({type:Types.ObjectId,required:true})
    couponId:string;
    
    @Prop({type:Number,required:true})
    discountAmount:number;
    
    @Prop({type:String,required:true})
    code:string;
}

@Schema({timestamps:true})
export class Order{
    readonly _id!: Types.ObjectId;

    @Prop({type:Types.ObjectId,ref:'User',required:true})
    userId: Types.ObjectId;

    @Prop({type:Address,required:true})
    address: Address;

    @Prop({type:[OrderProduct],required:true})
    products: OrderProduct[];
    
    @Prop({type:String,enum:PaymentMethod,default:PaymentMethod.COD})
    paymentMethod: PaymentMethod;
    
    @Prop({type:String,enum:OrderStatus,default: function(this:Order){
        if(this.paymentMethod === PaymentMethod.COD){
            return OrderStatus.PLACED;
        }
        else{
            return OrderStatus.PENDING;
        }
        } })
    status: OrderStatus;
    
    
    @Prop({type:CouponDetail})
    coupon: CouponDetail;

    @Prop({type:Number,required:true})
    totalAmount: number;
    
    @Prop({type:Date,required:true})
    createdAt: Date;

    @Prop({type:Date,required:true})
    updatedAt: Date;
}

export const orderSchema = SchemaFactory.createForClass(Order);