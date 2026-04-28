import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";
import { DiscountType } from "src/common/enum";

@Schema({timestamps:true})
export class UserCoupon{
    customerId!: Types.ObjectId;
    count!: number;
}

@Schema({timestamps:true})
export class Coupon{

    readonly _id !: Types.ObjectId;
    @Prop({type:String, required:true})
    code!: string;

    @Prop({type:Number, required:true})
    discountAmount!: number;

    @Prop({type:String, enum:DiscountType, default:DiscountType.fixed_amount})
    discountType!: DiscountType;

    @Prop({type:Date, required:true})
    fromDate!: Date;

    @Prop({type:Date, required:true})
    toDate!: Date;

    @Prop({type: SchemaTypes.ObjectId, ref:'User', required:true})
    createdBy!: Types.ObjectId;

    @Prop({type: SchemaTypes.ObjectId, ref:'User', required:true})
    updatedBy!: Types.ObjectId;

    @Prop({type:Boolean, required:true})
    active!: Boolean;

    @Prop({type: UserCoupon})
    usedBy!: UserCoupon[];
    @Prop({type: UserCoupon})
    assignedTo!:UserCoupon[];

}

export const couponSchema = SchemaFactory.createForClass(Coupon);