import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        console.log(request.cookies);
        console.log(request.cookies['access_token']);
        if (request.cookies['access_token']) {
            // console.log(request.cookies['access_token']);
            console.log('in');
            return true;
        }
        console.log('out : ' +request.cookies['access_token']);
        return false;
        // console.log(request.cookies['access_token']);
    }
}