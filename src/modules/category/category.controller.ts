import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard, Roles, RolesGuard, User } from 'src/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryFactoryService } from './factory';
import { Auth } from 'src/common/decorators/auth.decorator';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Public } from 'src/common/decorators/public.decorator';


@Controller('category')
@Auth(['Admin','Customer'])

export class CategoryController {
  constructor(private readonly categoryService: CategoryService, private readonly categoryFactoryService: CategoryFactoryService) { }

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto, @User() user: any) {
    const category = this.categoryFactoryService.createCategory(createCategoryDto, user);
    const createdCategory = await this.categoryService.create(category);
    return {
      success:true,
      message:'Category is created successfully',
      data:createdCategory,
    }
  }

  @Put(':id')
  async update(@Param('id') id:string, @Body() updateCategoryDto: UpdateCategoryDto, @User() user: any) {
    const category = await this.categoryFactoryService.updateCategory(id,updateCategoryDto, user);
    const updatedCategory = await this.categoryService.update(id,category);

    return {
      success:true,
      message:'Category is updated successfully',
      data:updatedCategory,
    }

  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const category = await this.categoryService.findOne(id);
    return {
      success:true,
      data:category
    }
  }
  
  @Public()
  @Get()
  async findAll() {
    const category = await this.categoryService.findAll();
    return {
      success:true,
      data:category
    }
  }


  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
  //   return this.categoryService.update(+id, updateCategoryDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
