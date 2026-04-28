import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Order } from "./order.schema";
import { AbstractRepository } from "@models/abstract.repository";
import { Model } from "mongoose";

@Injectable()
export class OrderRepository extends AbstractRepository<Order>{
    constructor(@InjectModel(Order.name) private readonly OrderModel:Model<Order>){
        super(OrderModel);
    }
}