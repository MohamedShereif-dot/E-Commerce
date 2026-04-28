import { Types } from "mongoose";

export class Customer {
    readonly _id: Types.ObjectId;
    userName: String;
    email: String;
    password: String;
    dob: Date;
    otp: string;
    otpExpiry: Date;
    isVerified: boolean;
}
