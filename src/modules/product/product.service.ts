import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { CategoryService } from '@modules/category/category.service';
import { BrandService } from '@modules/brand/brand.service';
import { ProductRepository } from '@models/index';
import { MESSAGE } from 'src/common';
import { Types } from 'mongoose';


@Injectable()
export class ProductService {
  constructor(private readonly categoryService:CategoryService,private readonly brandService:BrandService,private readonly productRepository:ProductRepository){}
  
  async create(product:Product,user:any) {
    await this.brandService.findOne(product.brandID);
    await this.categoryService.findOne(product.categoryID);
    
    const productExist = await this.productRepository.getOne({slug:product.slug,$or:[{createdBy:user._id},{updatedBy:user._id}]});
    if(productExist) {
      return await this.update(productExist._id,product)
    };
    return await this.productRepository.create(product);
  }
  
  findAll() {
    return `This action returns all product`;
  }
  
  async findOne(id: string|Types.ObjectId) {
    const productExist = await this.productRepository.getOne({_id:id});
    
    if(!productExist) throw new NotFoundException(MESSAGE.product.notFound);
    return productExist;
  }
  
  async update(id: string|Types.ObjectId, product:Product) {
    const productExist = await this.findOne(id);

    return await this.productRepository.updateOne({slug:productExist.slug},product,{new:true});
  }

  async remove(id: string|Types.ObjectId) {
    const productExist = await this.findOne(id);

    return await this.productRepository.remove({_id:id});
  }
}
