import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Customer, CustomerRepository, customerSchema, Seller, SellerRepository, sellerSchema, User, UserRepository, userSchema } from "src/models";

@Module({
    imports:[
        MongooseModule.forFeature([{
        name:User.name,
        schema:userSchema,
        discriminators:[
            {name:Seller.name,schema:sellerSchema},
            {name:Customer.name,schema:customerSchema},        ]
        }])
    ],
    controllers:[],
    providers:[SellerRepository,CustomerRepository,UserRepository],
    exports:[SellerRepository,CustomerRepository,UserRepository]
})

export class UserMongoModule{
    constructor(){}
}