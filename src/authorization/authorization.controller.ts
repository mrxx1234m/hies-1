import { Body, Controller, Get, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { RegisterDto } from './dto/register.dto';
import { ApiOperation } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

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
    @Get('google')
     async googleLogin(@Query('ref') ref: string, @Res() res: Response) {
       if (ref) {
         res.cookie('ref', ref, { maxAge: 5 * 60 * 1000 }); // 5 daqiqaga cookie saqlaymiz
       }
       return res.redirect('/authorization/google/redirect-to-google');
     }
     @Get('google/redirect-to-google')
     @UseGuards(AuthGuard('google'))
     async redirectToGoogle(@Req() req) {
       // bu yerga hech qachon kelmaydi
     }
     @Get('google/redirect')
     
     @UseGuards(AuthGuard('google'))
     async googleRedirect(@Req() req: any, @Res() res: Response) {
       const { user, token } = req.user;
       const ref = req.cookies?.ref;
   
       if (ref) {
         await this.saveReferral(ref, user.id);
         res.clearCookie('ref');
       }
   
       const frontendUrl = process.env.FRONTEND_URL;
       return res.redirect(`${frontendUrl}/oauth-success?token=${token}`);
     }
      // Dummy referal saqlash
      async saveReferral(referrerId: string, newUserId: number) {
        console.log(`Foydalanuvchi ${newUserId} referal orqali ${referrerId} ga biriktirildi`);
        // Bu yerda DBga yozish lozim
      }
}
