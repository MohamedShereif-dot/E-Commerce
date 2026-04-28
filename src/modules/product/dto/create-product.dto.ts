import { IsArray, IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator";
import { Types } from "mongoose";
import { DiscountType } from "src/common/enum";

export class CreateProductDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    name:string;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    description:string;

    @IsArray()
    @IsString({each:true})
    colors:string[];

    @IsArray()
    @IsString({each:true})
    sizes:string[];
    
    @IsMongoId()
    @IsNotEmpty()
    categoryID:Types.ObjectId;
    @IsMongoId()
    @IsNotEmpty()
    brandID:Types.ObjectId;
    
    @IsNumber()
    @IsNotEmpty()
    price:number;
    
    @IsNumber()
    @IsOptional()
    discountAmount:number;
    
    @IsEnum(DiscountType)
    @IsString()
    @IsOptional()
    discountType:DiscountType;
    
    @IsNumber()
    @IsOptional()
    stock:number;
}
