import {Controller, Delete, Get, Post, UseGuards} from '@nestjs/common';
import {PermissionsGuard} from "../../permissions/guards/permissions.guard";
import {Permissions} from "../../permissions/decorators/permission.decorator";

@Controller('project')
@UseGuards(PermissionsGuard)
export class ProjectController {

    @Post()
    // The permission names listed here are examples and can be updated according to the permission names you add to your database.
    @Permissions('ADD_ITEM')
    addItem() {
        return 'add item successfully';
    }

    @Delete()
    // The permission names listed here are examples and can be updated according to the permission names you add to your database.
    @Permissions('DELETE_ITEM')
    deleteItem() {
        return 'delete item successfully';
    }

    @Get()
    // The permission names listed here are examples and can be updated according to the permission names you add to your database.
    @Permissions('VIEW_ITEM')
    viewItem() {
        return 'view item successfully';
    }


}
