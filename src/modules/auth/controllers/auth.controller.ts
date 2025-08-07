import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from "../services";
import {Public} from "../../../core/decorators/public.decorator";
import {LoginDto, RegisterDto} from "../dtos";

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {
    }

    @Post('register')
    @Public()
    register(@Body() body: RegisterDto) {
        return this.authService.register(body.email, body.password);
    }

    @Post('login')
    @Public()
    login(@Body() body: LoginDto) {
        return this.authService.login(body.email, body.password)
    }
}
