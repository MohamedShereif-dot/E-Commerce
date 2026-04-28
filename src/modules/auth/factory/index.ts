import { Customer } from "@models/index";
import { RegisterDTO } from "../dto/register.dto";
import * as bcrypt from "bcrypt";
import generateOTP from "src/common/helpers/otp.helpers";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthFactoryService{
    async createCustomer(registerDTO:RegisterDTO){
        const customer = new Customer();
        customer.userName=registerDTO.userName;
        customer.email=registerDTO.email;
        customer.password= await bcrypt.hash(registerDTO.password,10);
        customer.otp=generateOTP();
        customer.otpExpiry=new Date(Date.now() + 5*60*1000);
        customer.isVerified=false;
        customer.dob=registerDTO.dob;
        return customer;
    }
}