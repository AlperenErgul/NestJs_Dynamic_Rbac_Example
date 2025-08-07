import {Module} from '@nestjs/common';
import {AuthController} from "./controllers";
import {AuthService} from "./services";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import process from "process";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {UsersModule} from "../users/users.module";
import {JwtStrategy} from "./strategy/jwt.strategy";

@Module({
    imports: [
        PassportModule,
        UsersModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                secret: config.get('JWT_SECRET'),
                signOptions: { expiresIn: '1d' },
            }),
        }),
    ],
    controllers: [
        AuthController
    ],
    providers: [
        AuthService,
        JwtStrategy
    ]
})
export class AuthModule {
}
