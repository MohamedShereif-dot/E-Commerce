import { applyDecorators, UseGuards } from "@nestjs/common"
import { AuthGuard, RolesGuard } from "../guards"
import { Roles } from "./roles.decorator"

export const Auth = (roles:string[]) => {
    return applyDecorators(Roles(roles), UseGuards(AuthGuard, RolesGuard));
} 