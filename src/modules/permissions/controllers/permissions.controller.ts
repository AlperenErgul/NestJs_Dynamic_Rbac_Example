import {Body, Controller, Post} from '@nestjs/common';
import {PermissionsService} from "../services/permissions.service";
import {CreatePermissionDto} from "../dtos";
import {PermissionEntity} from "../entities";
import {Permissions} from "../decorators/permission.decorator";

@Controller('permissions')
export class PermissionsController {

    constructor(
        private readonly permissionsService: PermissionsService
    ) {
    }

    @Post()
    @Permissions('CREATE_PERMISSION')
    async create(@Body() payload: CreatePermissionDto): Promise<PermissionEntity> {
        return await this.permissionsService.createPermission(payload);
    }

}
