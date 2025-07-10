import { Injectable } from '@nestjs/common';
import { CustomError } from 'src/common/errors/custom.errors';
import { NotFoundError } from 'src/common/errors/not-found-error';
import findUserId from 'src/common/utils/find-user-id';
import { PrismaService } from 'src/core/database/prisma.service';
import { ChangePasswordDto } from './dto/chacked-password';
import * as bcrypt from 'bcrypt'
@Injectable()
export class UsersService {
    constructor(private readonly prisma:PrismaService){}
    async getAllUser(){
        return this.prisma.users.findMany()
    }
    async getByToken(req:any){
        return req
    }
    async deleteUser(id:number){
        const oldUser = await findUserId(id)
        if(!oldUser){
            throw new NotFoundError('user')
        }
        const result = await this.prisma.users.delete({where:{id:oldUser.id}})
        return result
    }
    async block(id:string){
        const userId = Number(id);
      
        const oldUser = await this.prisma.users.findUnique({
          where: { id: userId },
        });
      
        if (!oldUser) {
          throw new CustomError( "Foydalanuvchi topilmadi",404);
        }
        const data = await this.prisma.users.update({where:{id:Number(id)},data:{isActive:false}})
        return data

      }
      async deBlock(id:string){
        const userId = Number(id);
      
        const oldUser = await this.prisma.users.findUnique({
          where: { id: userId },
        });
      
        if (!oldUser) {
          throw new CustomError( "Foydalanuvchi topilmadi",404);
        }
        const data = await this.prisma.users.update({where:{id:Number(id)},data:{isActive:true}})
        return data
        
      }
      async changePassword(body:ChangePasswordDto,req:any){
        const oldUser = await this.prisma.users.findFirst({where:{email:req.user.email}})
        if(!oldUser){
          throw new NotFoundError('user')
        }
        const hashedPassword =  await bcrypt.hash(body.password, 10);
        const result = await this.prisma.users.update({where:{id:oldUser.id},data:{password:hashedPassword}})
        return result
      }
      
}
