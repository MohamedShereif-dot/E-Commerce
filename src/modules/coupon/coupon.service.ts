import { Injectable } from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';

@Injectable()
export class CouponService {
  create(createCopounDto: CreateCouponDto) {
    return 'This action adds a new copoun';
  }

  findAll() {
    return `This action returns all copoun`;
  }

  findOne(id: number) {
    return `This action returns a #${id} copoun`;
  }

  update(id: number, updateCopounDto: UpdateCouponDto) {
    return `This action updates a #${id} copoun`;
  }

  remove(id: number) {
    return `This action removes a #${id} copoun`;
  }
}
