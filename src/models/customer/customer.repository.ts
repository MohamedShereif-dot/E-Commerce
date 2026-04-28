import { AbstractRepository } from "@models/abstract.repository";
import { Customer } from "./customer.schema";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class CustomerRepository extends AbstractRepository<Customer> {
    constructor(@InjectModel(Customer.name) private readonly customerModel:Model<Customer>){
        super(customerModel);
    }
}