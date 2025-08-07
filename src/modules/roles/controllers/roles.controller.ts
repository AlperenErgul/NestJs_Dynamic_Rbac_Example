import {Body, Controller, Post} from '@nestjs/common';
import {RolesService} from "../services/roles.service";
import {CreateRoleDto} from "../dtos/create-role.dto";
import {RoleEntity} from "../entities";
import {Permissions} from "../../permissions/decorators/permission.decorator";

@Controller('roles')
export class RolesController {

    constructor(private readonly rolesService: RolesService) {
    }

    @Post()
    @Permissions('CREATE_ROLE')
    async create(@Body() payload: CreateRoleDto): Promise<RoleEntity> {
        return await this.rolesService.create(payload);
    }

}
