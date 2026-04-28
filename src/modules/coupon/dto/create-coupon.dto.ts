import { IsArray, IsBoolean, IsDate, IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, Length, MinDate, MinLength } from "class-validator";
import { Types } from "mongoose";
import { DiscountType } from "src/common/enum";

export class CreateCouponDto {

    @IsString()
    @IsNotEmpty()
    @Length(5,5)
    code!: string;

    @IsNumber()
    @IsNotEmpty()
    discountAmount!: number;

    @IsEnum(DiscountType)
    @IsNotEmpty()
    discountType!: DiscountType;
    
    @IsDate()
    @MinDate(new Date(Date.now()-24*60*60*1000)) 
    fromDate!: Date;
    
    @IsDate()
    @IsNotEmpty()
    @MinDate(new Date(Date.now()-24*60*60*1000)) 
    toDate!: Date;

    @IsBoolean()
    @IsNotEmpty()
    active!: Boolean;

    @IsArray()
    @IsMongoId({each:true})
    assignedTo!:Types.ObjectId[];
}

