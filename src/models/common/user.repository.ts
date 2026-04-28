import { Model } from "mongoose";
import { User } from "./user.schema";
import { AbstractRepository } from "@models/abstract.repository";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class UserRepository extends AbstractRepository<User>{
    constructor(@InjectModel(User.name) private readonly userModel:Model<User>){
        super(userModel);
    }
}