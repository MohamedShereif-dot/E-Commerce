import { Injectable } from "@nestjs/common";
import { CreateCouponDto } from "../dto/create-coupon.dto";
import { CouponRepository } from "@models/index";
import { Coupon } from "../entities/coupon.entity";

@Injectable()
export class CouponFactoryService{

    constructor(private readonly couponRepository:CouponRepository){}
    createCoupon(createCouponDto:CreateCouponDto,user:any){
        
        let coupon = new Coupon();

        coupon.active=createCouponDto.active;
        coupon.assignedTo=createCouponDto.assignedTo.map((id)=>({customerId:id,count:0}));
        coupon.code=createCouponDto.code;
        coupon.createdBy=user._id;
        coupon.updatedBy=user._id;
        coupon.discountAmount=createCouponDto.discountAmount;
        coupon.discountType=createCouponDto.discountType;
        coupon.fromDate=createCouponDto.fromDate;
        coupon.toDate=createCouponDto.toDate;
        coupon.usedBy=[];
        return coupon;
    }
}