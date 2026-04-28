import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";

@Schema({timestamps:true,toJSON: { virtuals: true }, toObject: { virtuals: true }})
export class Category{
    readonly _id:Types.ObjectId;

    @Prop({type:String,required:true,unique:true,trim:true})
    name:string;
    @Prop({type:String,required:true,unique:true,trim:true})
    slug:string;
    @Prop({type:SchemaTypes.ObjectId,required:true,trim:true,ref:'User'})
    createdBy:Types.ObjectId;
    @Prop({type:SchemaTypes.ObjectId,required:true,trim:true,ref:'User'})
    updatedBy:Types.ObjectId;

    // ToDo
    logo:Object;
}

export const categorySchema = SchemaFactory.createForClass(Category);