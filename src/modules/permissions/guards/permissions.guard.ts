import {CanActivate, ExecutionContext, ForbiddenException, Injectable} from '@nestjs/common';
import { Observable } from 'rxjs';
import {Reflector} from "@nestjs/core";
import {PERMISSIONS_KEY} from "../decorators/permission.decorator";
import {UserEntity} from "../../users/entities";

@Injectable()
export class PermissionsGuard implements CanActivate {

  constructor(private reflector: Reflector) {
  }
  canActivate(
    context: ExecutionContext,
  ): boolean {

    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
        PERMISSIONS_KEY,
        [context.getHandler(), context.getClass()]
    );

    if (!requiredPermissions || requiredPermissions.length == 0) return true;

    const request = context.switchToHttp().getRequest()
    const user: UserEntity = request.user;

    if (!user || !user.roles) return false;

    const userPermissions = user.roles.flatMap((role) =>
      role.permissions.map((perm) => perm.name)
    )

    const hasPermission = requiredPermissions.every((p) =>
      userPermissions.includes(p)
    )

    if (!hasPermission){
      throw new ForbiddenException('DontHaveRequiredPermissions');
    }

    return true;
  }
}
