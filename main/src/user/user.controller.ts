import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {

    }

    @Get()
    async all() {
        return await this.userService.all();
    }

    @Post()
    async create(@Body() user: any) {
        return await this.userService.create(user)
    }

    

    @Get('getByUserName')
    async getByUserName(@Query('userName') userName: string) {
        return await this.userService.getByUserName(userName);
    }

    @Put(':userId')
    async update(@Param('userId') userId: string, @Body() userData: any) {
        return await this.userService.update(userId, userData);
    }

    @Delete(':userId')
    async delete(@Param('userId') userId: string) {
        return await this.userService.delete(userId)
    }

    @Get(':userId')
    async getUserById(@Param('userId') userId: string) {
        return await this.userService.getUserById(userId);
    }
}
