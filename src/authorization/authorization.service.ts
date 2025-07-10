import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { RegisterDto } from './dto/register.dto';
import findUser from 'src/common/utils/findUser';
import { AlreadyExistsError } from 'src/common/errors/already-exists-error';
import * as bcrypt from 'bcrypt'
import { AuthService } from 'src/auth/auth.service';
import { LoginDto } from './dto/login.dto';
import { NotFoundError } from 'src/common/errors/not-found-error';
import { CustomError } from 'src/common/errors/custom.errors';
@Injectable()
export class AuthorizationService {
    constructor(private readonly prisma:PrismaService,private authService:AuthService){}
    async register(body:RegisterDto){
        const oldUser = await findUser(body.email)
        if(oldUser){
            throw new AlreadyExistsError('User') 
        }
        const hashedPassword = await bcrypt.hash(body.password,10)
        const result = await this.prisma.users.create({data:{fullname:body.fullName,password:hashedPassword,email:body.email}})
        const {email} = result
        const token = await this.authService.createAccessToken({email})
        return {data:result,token}
    }
    async login(body:LoginDto){
        const oldUser = await findUser(body.email)
        if(!oldUser){
            throw new NotFoundError('user')
        }
        const isMatch = await bcrypt.compare(body.password,oldUser.password || '')
        if(!isMatch){
            throw new CustomError("Ro'yhatdan o'ting",400)
        }
        const email = oldUser.email
        const token = await this.authService.createAccessToken({email})
        return {data:oldUser,token}
    }
}
