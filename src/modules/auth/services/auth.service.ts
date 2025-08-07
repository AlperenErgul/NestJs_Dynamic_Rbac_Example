import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from "../../users/services/users.service";
import {JwtService} from "@nestjs/jwt";
import {UserEntity} from "../../users/entities";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {
    }

    async register(email: string, password: string): Promise<UserEntity> {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        return await this.usersService.create(email, hashedPassword);
    }

    async login(email: string, password: string): Promise<{ access_token: string }> {
        const user = await this.usersService.findOneByEmail(email);

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException('EmailOrPasswordIsWrong');
        }

        const payload = {sub: user.id}

        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
