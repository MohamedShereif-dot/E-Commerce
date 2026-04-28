import { SetMetadata } from "@nestjs/common";

export const PUBLIC='Public';
export const Public = ()=> SetMetadata(PUBLIC,true);