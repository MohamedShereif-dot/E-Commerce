import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';
import { Auth, MESSAGE, User } from 'src/common';
import { ProductFactoryService } from './factory';


@Controller('product')
@Auth(["Customer"])
export class ProductController {
  constructor(private readonly productService: ProductService,private readonly productFactoryService:ProductFactoryService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto,@User() user:any) {
    const product = this.productFactoryService.createProduct(createProductDto,user);
    const createdProduct= await this.productService.create(product,user);

    return {
      success:'true',
      message:MESSAGE.product.created,
      data:createdProduct
    }
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
