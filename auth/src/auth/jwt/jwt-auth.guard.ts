import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    handleRequest(err: any, user: any, info: any, context: ExecutionContext, status?: any): any {
        console.log(context);
        console.log(status);
        
        if(err || !user ) {
            throw err || new UnauthorizedException();
        }
        return user;
    }
}