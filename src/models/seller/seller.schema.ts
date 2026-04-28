import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({timestamps:true,discriminatorKey:'role',toJSON:{virtuals:true},toObject:{virtuals:true}})
export class Seller{
    userName:string;
    email:string;
    password:string;

    @Prop({type:String,required:true})
    whatsAppNumber:string;
}

export const sellerSchema = SchemaFactory.createForClass(Seller);