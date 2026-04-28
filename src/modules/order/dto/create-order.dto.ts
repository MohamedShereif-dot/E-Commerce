import { IsEnum, IsMongoId, IsNumber, IsObject, IsOptional, IsString } from "class-validator";
import { PaymentMethod } from "src/common/enum";

export class AddressDTO{

    @IsString()
    street:string;

    @IsString()
    city:string;

    @IsString()
    state:string;

    @IsString()
    country:string;

    @IsString()
    code:string;

    @IsString()
    phoneNumber:string;

}

class CouponDetail{
    @IsMongoId()
    couponId:string;

    @IsNumber()
    discountAmount:number;

    @IsString()
    code:string;


}

export class CreateOrderDto {
    @IsObject()
    address: AddressDTO;

    @IsString()
    @IsEnum(PaymentMethod)
    @IsOptional()
    paymentMethod: PaymentMethod;
    
    @IsObject()
    @IsOptional()
    coupon: CouponDetail;

// todo:     buy single product , specific products from cart or from product card
    // products?:{
    //     productId:string;
    //     quantity:number;
    // }[];
}
