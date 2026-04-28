import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';

@Controller('copoun')
export class CouponController {
  constructor(private readonly copounService: CouponService) {}

  @Post()
  create(@Body() createCouponDto: CreateCouponDto) {
    return this.copounService.create(createCouponDto);
  }

  @Get()
  findAll() {
    return this.copounService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.copounService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCouponDto: UpdateCouponDto) {
    return this.copounService.update(+id, updateCouponDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.copounService.remove(+id);
  }
}
