import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {PermissionEntity} from "./entities";
import {PermissionsService} from "./services/permissions.service";
import {PermissionsController} from "./controllers/permissions.controller";


@Module({
    imports: [
        TypeOrmModule.forFeature([
            PermissionEntity
        ])
    ],
    providers:[
        PermissionsService
    ],
    controllers:[
        PermissionsController
    ]
})
export class PermissionsModule {
}
