import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { User, UserStatus } from 'data-model';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;

    if (!request.headers.authorization) {
      throw new UnauthorizedException();
    }

    const token = request.headers.authorization.split(' ')[1];
    const decoded: User = this.jwtService.verify(token);

    // check if user has permission to access this resource, only admins and developers can access this resource
    const hasValidStatus = decoded.status === UserStatus.Pending_Verification;

    if (!hasValidStatus) {
      throw new UnauthorizedException();
    }

    request.jwtData = decoded;
    return true;
  }
}
