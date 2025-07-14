import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { AdminGuard } from 'src/auth/admin.guard';
import { ChangePasswordDto } from './dto/chacked-password';
import { SuperAdminGuard } from 'src/auth/superadmin.guard';

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
    @Get("block/:id")
    @ApiOperation({summary:"Userni block qilish uchun block/id bilan"})
    @ApiBearerAuth()
    @ApiResponse({status:200,description:"success"})
    @UseGuards(AuthGuard,SuperAdminGuard)
    async blcok(@Param('id') id:string){

        const data = await this.service.block(id)
        return data
    }
    @Get("deblock/:id")
    @ApiOperation({summary:"Userni blockdan ochish uchun block/id bilan"})
    @UseGuards(AuthGuard,AdminGuard)
    @ApiBearerAuth()
    @ApiResponse({status:200,description:"success"})
    async deBlock(@Param('id') id:string){
        const data = await this.service.deBlock(id)
        return data
    }
    @Post('up-password')
    @ApiOperation({summary:"Userni parolini yangilamoqchi bo'lsa"})
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    async checkedPassword(@Body() body:ChangePasswordDto, @Req() req:any){
        return this.service.changePassword(body,req)
    }
    @Delete('delete/:id')
    @ApiOperation({summary:"user delete for admin"})
    @UseGuards(AuthGuard,AdminGuard)
    @ApiBearerAuth()
    async deleteUser(@Param('id') id:string ){
        return this.service.deleteUser(Number(id))
    }
}

