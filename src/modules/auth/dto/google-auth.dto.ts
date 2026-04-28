import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class GoogleAuthDTO {
    @IsNotEmpty()
    @IsString()
    idToken: string;

    @IsOptional()
    @IsString()
    accessToken?: string;
}

export class GoogleAuthCallbackDTO {
    @IsNotEmpty()
    @IsString()
    code: string;

    @IsOptional()
    @IsString()
    state?: string;
}