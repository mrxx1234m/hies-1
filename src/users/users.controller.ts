import { Body, Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { AdminGuard } from 'src/auth/admin.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly service:UsersService){}
    @ApiOperation({summary:"Get all user for admin"})
    @UseGuards(AuthGuard,AdminGuard)
    @ApiBearerAuth()
    @Get('get-all/admin')
    async getAllUser(){
        return this.service.getAllUser()
    }

    @ApiOperation({summary:'Get by user token'})
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @Get('get/token')
    async getByToken(@Req() req:any){        
        return this.service.getByToken(req.user)
    }
}
