import { ProductRepository, User } from "@models/index";
import { Injectable } from "@nestjs/common";
import { CreateProductDto } from "../dto/create-product.dto";
import { Product } from "../entities/product.entity";
import slugify from "slugify";
import { Types } from "mongoose";

@Injectable()
export class ProductFactoryService{
    constructor(private readonly productRepository:ProductRepository){}
    createProduct(productDto:CreateProductDto,user:any){
        const product = new Product();

        product.name=productDto.name;
        product.slug=slugify(productDto.name);
        product.description=productDto.description;

        product.brandID=new Types.ObjectId(productDto.brandID);
        product.categoryID=new Types.ObjectId(productDto.categoryID);
        product.createdBy=user._id;
        product.updatedBy=user._id;

        product.discountAmount=productDto.discountAmount;
        product.discountType=productDto.discountType;
        product.price=productDto.price;
        product.stock=productDto.stock;
        product.sold=0;

        product.colors=productDto.colors;
        product.sizes=productDto.sizes;
        
        return product;
    }
}