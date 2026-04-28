import {  Prop, Schema, SchemaFactory, Virtual } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";
import { DiscountType } from "src/common/enum";

@Schema({timestamps:true,discriminatorKey:'role',toJSON:{virtuals:true},toObject:{virtuals:true}})
export class Product{
    readonly _id:Types.ObjectId;
    // _________ strings
    @Prop({type:String,required:true,trim:true})
    name:string;
    @Prop({type:String,required:true,trim:true})
    slug:string;
    @Prop({type:String,required:true,trim:true})
    description:string;
    @Prop({type:[String],trim:true, set:(value: string[]) => value ? [...new Set(value)] : value})
    colors:string[];
    @Prop({type:[String],trim:true, set:(value: string[]) => value ? [...new Set(value)] : value})
    sizes:string[];

    // _________ ObjectIds
    @Prop({type:SchemaTypes.ObjectId,ref:'Category',required:true})
    categoryID:Types.ObjectId;
    @Prop({type:SchemaTypes.ObjectId,ref:'Brand',required:true})
    brandID:Types.ObjectId;
    @Prop({type:SchemaTypes.ObjectId,ref:'User',required:true})
    createdBy:Types.ObjectId;
    @Prop({type:SchemaTypes.ObjectId,ref:'User',required:true})
    updatedBy:Types.ObjectId;
    
    // _________ Numbers
    @Prop({type:Number,required:true,min:1})
    price:number;
    @Prop({type:Number,required:true,min:0, default:0})
    discountAmount:number;
    @Prop({type:String,default:DiscountType.fixed_amount})
    discountType:DiscountType;
    
    @Virtual({
        get: function(this:Product){
            return this.discountType==DiscountType.fixed_amount ? this.price - this.discountAmount: this.price - (this.price*this.discountAmount/100);
        }
    })
    finalPrice:number;
    @Prop({type:Number,min:0,default:1})
    stock:number;
    @Prop({type:Number,min:0})
    sold:number;

}

export const productSchema = SchemaFactory.createForClass(Product);


//------ Another way to avoid duplicates in arrays is to use pre-save middleware ------

// productSchema.pre('save', function(next) {
//     if (this.colors) {
//         this.colors = [...new Set(this.colors)];
//     }
//     if (this.sizes) {
//         this.sizes = [...new Set(this.sizes)];
//     }
//     next();
// });