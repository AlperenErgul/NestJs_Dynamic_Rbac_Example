import {Body, Controller, Param, ParseIntPipe, Post, UseGuards} from '@nestjs/common';
import {UsersService} from "../services/users.service";
import {PermissionsGuard} from "../../permissions/guards/permissions.guard";
import {Permissions} from "../../permissions/decorators/permission.decorator";
import {AssignRoleDto} from "../dtos/assign-role.dto";

@Controller('users')
@UseGuards(PermissionsGuard)
export class UsersController {

    constructor(private readonly usersService: UsersService) {
    }

    @Post(':userId/assign-role')
    @Permissions('ASSIGN_ROLE')
    async assignRole(@Param('userId', ParseIntPipe) userId: number, @Body() payload: AssignRoleDto): Promise<boolean> {
        await this.usersService.assignRoleToUser(userId, payload);
        return true;
    }


}
