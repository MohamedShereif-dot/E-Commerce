import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Roles } from "../decorators";
import { PUBLIC } from "../decorators/public.decorator";

@Injectable()
export class RolesGuard implements CanActivate{

    constructor(private readonly reflector:Reflector){}

    canActivate(context:ExecutionContext):boolean{
        const publicVal=this.reflector.get(PUBLIC,context.getHandler());
        
        if(publicVal) return true;

        const request = context.switchToHttp().getRequest();
        const roles = this.reflector.getAllAndMerge(Roles,[context.getHandler(),context.getClass()]);

        if(!roles.includes(request.user.role)) throw new UnauthorizedException('You are not allowed');
        return true;
    }

}
