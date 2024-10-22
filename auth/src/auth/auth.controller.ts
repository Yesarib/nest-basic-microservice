import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {

    }

    @Post('login')
    async login(@Body('username') userName: string, @Body('password') password: string) {
        return this.authService.login({ userName, password });
    }

    @Post('register')
    async register(@Body('userName') userName: string, @Body('password') password: string){
        return this.authService.register(userName,password)
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
