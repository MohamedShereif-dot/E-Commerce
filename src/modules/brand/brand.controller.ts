import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { BrandFactoryService } from './factory';
import { Auth, MESSAGE, User } from 'src/common';
import { Types } from 'mongoose';

@Controller('brand')
@Auth(['Customer'])
export class BrandController {
  constructor(private readonly brandService: BrandService,private readonly brandFactoryService:BrandFactoryService) {}

  @Post()
  async create(@Body() createBrandDto: CreateBrandDto,@User() user:any) {
    const brand = this.brandFactoryService.createBrand(createBrandDto,user);
    const createdBrand = await this.brandService.create(brand);

    return {
      success:true,
      message:"Brand is created successfully",
      data: createdBrand
    }
  }

  @Get()
  findAll() {
    return this.brandService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string|Types.ObjectId) {
    const brand = await this.findOne(id);

    return {
      success:'true',
      message:MESSAGE.brand.found
    }

  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto) {
    return this.brandService.update(+id, updateBrandDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brandService.remove(+id);
  }
}
