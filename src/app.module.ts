import {Module} from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {PostgresqlModule} from "./core/modules/postgresql/postgresql.module";
import {PermissionsModule} from "./modules/permissions/permissions.module";
import {UsersModule} from "./modules/users/users.module";
import {RolesModule} from "./modules/roles/roles.module";
import {AuthModule} from "./modules/auth/auth.module";
import {ProjectModule} from "./modules/project/project.module";
import {APP_GUARD} from "@nestjs/core";
import {JwtAuthGuard} from "./modules/auth/guards/auth.guard";

@Module({
    imports: [
        ConfigModule.forRoot({envFilePath: ".env", isGlobal: true}),
        PostgresqlModule,
        PermissionsModule,
        UsersModule,
        RolesModule,
        AuthModule,
        ProjectModule,
    ],
    controllers: [],
    providers: [
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard
        }
    ],
})
export class AppModule {
}
