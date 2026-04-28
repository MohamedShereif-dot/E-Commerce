import { Injectable } from "@nestjs/common";
import { CreateBrandDto } from "../dto/create-brand.dto";
import { Brand } from "../entities/brand.entity";
import slugify from "slugify";


@Injectable()
export class BrandFactoryService{
    createBrand(createBrandDto:CreateBrandDto,user:any){
        const brand=new Brand();
        brand.name=createBrandDto.name;
        brand.slug= slugify(brand.name);
        brand.logo=createBrandDto.logo;
        brand.createdBy=user._id;
        brand.updatedBy=user._id;
        
        return brand;
    }
}