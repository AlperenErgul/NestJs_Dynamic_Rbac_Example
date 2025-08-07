import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {RoleEntity} from "./entities";
import {RolesController} from "./controllers/roles.controller";
import {RolesService} from "./services/roles.service";
import {PermissionEntity} from "../permissions/entities";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            RoleEntity,
            PermissionEntity
        ])
    ],
    controllers: [
        RolesController
    ],
    providers: [
        RolesService
    ]
})
export class RolesModule {
}
