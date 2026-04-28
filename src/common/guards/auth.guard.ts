import { UserRepository } from "@models/index";
import { CanActivate, ExecutionContext, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { PUBLIC } from "../decorators/public.decorator";
import { Reflector } from "@nestjs/core";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly configService: ConfigService, private readonly jwtService: JwtService, private readonly userRepository: UserRepository,private readonly reflector:Reflector) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        const { authorization } = request.headers;
        try {
    
        const publicVal=this.reflector.get(PUBLIC,context.getHandler());

        if(publicVal) return true;
        
        const payload = this.jwtService.verify<{
            _id: string;
            role: string;
            email: string;
        }>(authorization, { secret: this.configService.get('access').jwt_secret });

        const userExist = await this.userRepository.getOne({ _id: payload._id })

        if (!userExist) throw new NotFoundException('user not found')

            request.user = userExist;
            // request.user.role='User';

        return true;
        } catch (error) {
            throw new UnauthorizedException(error.message);
        }
    }
}
