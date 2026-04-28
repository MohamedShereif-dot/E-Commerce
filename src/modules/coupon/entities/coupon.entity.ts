import { UserCoupon } from "@models/index";
import { Types } from "mongoose";
import { DiscountType } from "src/common/enum";

export class Coupon {
    readonly _id !: Types.ObjectId;
    code!: string;
    discountAmount!: number;
    discountType!: DiscountType;
    fromDate!: Date;
    toDate!: Date;
    createdBy!: Types.ObjectId;
    updatedBy!: Types.ObjectId;
    active!: Boolean;
    usedBy!: UserCoupon[];
    assignedTo!:UserCoupon[];
}
