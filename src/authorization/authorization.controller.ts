import { Body, Controller, Post } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { RegisterDto } from './dto/register.dto';
import { ApiOperation } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@Controller('authorization')
export class AuthorizationController {
    constructor(private readonly service:AuthorizationService){}

    @ApiOperation({summary:"Register"})
    @Post('register')
    async register(@Body() body:RegisterDto){
        return this.service.register(body)
    }
    @ApiOperation({summary:"Login"})
    @Post('login')
    async login(@Body() body:LoginDto){
        return this.service.login(body)
    }
}
