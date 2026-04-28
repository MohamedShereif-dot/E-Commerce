import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';

import { Category, CategoryRepository } from '@models/index';
import { MESSAGE } from 'src/common';
import { Types } from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository:CategoryRepository){}
  async create(category: Category) {
    const categoryExist = await this.categoryRepository.getOne({slug:category.slug});
    if(categoryExist) throw new ConflictException(MESSAGE.category.alreadyExist);
    return await this.categoryRepository.create(category);
  }

  async update(id:string, category: Category) {
    const categoryExist = await this.categoryRepository.getOne({slug:category.slug, _id:{$ne: id}});
    if(categoryExist) throw new ConflictException('Category name is already exist');
    return await this.categoryRepository.updateOne({_id:id},category,{new:true});
  }

  async findOne(id: string|Types.ObjectId) {
    const categoryExist = await this.categoryRepository.getOne({_id:id},
      {},
      {populate:[{path:'createdBy'},{path:'updatedBy'}]});
    if(!categoryExist) throw new NotFoundException(MESSAGE.category.notFound);
    return categoryExist;
  }

  async findAll() {
    const categoryExist = await this.categoryRepository.getAll({},
      {},
      {});
    if(!categoryExist) throw new NotFoundException(MESSAGE.category.notFound);
    return categoryExist;
  }


  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
