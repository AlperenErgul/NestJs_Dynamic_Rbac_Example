import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "./entities";
import {UsersService} from "./services/users.service";
import {RoleEntity} from "../roles/entities";
import {PermissionEntity} from "../permissions/entities";
import {UsersController} from "./controllers/users.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity, RoleEntity, PermissionEntity])
    ],
    controllers:[UsersController],
    providers: [UsersService],
    exports: [UsersService]
})
export class UsersModule {
}
