import { PartialType } from '@nestjs/mapped-types';
import { AddToCartDto } from './AddToCart.dto';

export class UpdateCartDto extends PartialType(AddToCartDto) {}
