import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { tap } from 'rxjs/operators';

@Injectable()
export class UserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const header = req.headers;

    const token = header.authorization.split(' ')[1];
    const decoded = jwt.decode(token);

    req.user = { id: decoded.id, username: decoded.username };

    return next.handle();
  }
}
