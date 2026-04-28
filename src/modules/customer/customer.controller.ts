import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard, Roles, RolesGuard } from 'src/common';
import { CustomerService } from './customer.service';

@Controller('customer')
@UseGuards(AuthGuard)
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}
  
  @Roles(['Customer','Admin'])
  @UseGuards(RolesGuard)
  @Get()
  getProfile(@Request() req:any){
    return {message:'done', success:true, data:{user:req.user}};
  }
  
}
