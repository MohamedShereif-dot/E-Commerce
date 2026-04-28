import slugify from "slugify";
import { Category } from "../entity/category.entity";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateCategoryDto } from "../dto/create-category.dto";
import { UpdateCategoryDto } from "../dto/update-category.dto";
import { CategoryRepository } from "@models/index";

@Injectable()
export class CategoryFactoryService{

    constructor(private readonly categoryRepository:CategoryRepository){}
    createCategory(categoryDTO:CreateCategoryDto,user:any){
        const category = new Category();
        category.name=categoryDTO.name;
        category.slug=slugify(categoryDTO.name,{
            replacement:'_',
            trim:true,
        });
        category.createdBy=user._id;
        category.updatedBy=user._id;
        category.logo=categoryDTO.logo;
        return category
    }

    async updateCategory(id:string,categoryDTO:UpdateCategoryDto,user:any){
        const category = new Category();
        const categoryExist = await this.categoryRepository.getOne({_id:id});  
        if(!categoryExist) throw new NotFoundException('Category is not found');
        category.name=categoryDTO.name||categoryExist.name;
        category.slug=slugify(categoryDTO.name,{
            replacement:'_',
            trim:true,
        })||categoryExist.slug;
        category.updatedBy=user._id;
        category.logo=categoryDTO.logo||categoryExist.logo;
        return category
    }

}
