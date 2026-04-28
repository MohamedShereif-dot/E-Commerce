import { Injectable } from "@nestjs/common";
import { Model, MongooseBaseQueryOptionKeys, ProjectionType, QueryOptions, RootFilterQuery, UpdateQuery } from "mongoose";

@Injectable()
export class AbstractRepository<T> {
    constructor(private readonly model: Model<T>) {
    }
        public async create(item:Partial<T>){
            const doc = new this.model(item);
            return await doc.save();
        }

        public async getOne(filter:RootFilterQuery<T>,projection?:ProjectionType<T>,options?:QueryOptions):Promise<T | null>{
            return await this.model.findOne(filter,projection,options);
        }
        public async updateOne(filter:RootFilterQuery<T>,updateQuery?:UpdateQuery<T>,options?:QueryOptions):Promise<T | null>{
            return await this.model.findOneAndUpdate(filter,updateQuery,options);
        }

        public async getAll(filter:RootFilterQuery<T>,projection?:ProjectionType<T>,options?:QueryOptions):Promise<any>{
            return await this.model.find(filter,projection,options);
        }

        public async remove(filter:RootFilterQuery<T>,options?:Pick<QueryOptions<T>, "lean" | "timestamps" | MongooseBaseQueryOptionKeys> ):Promise<any>{
            return await this.model.deleteOne(filter,options);
        }

}