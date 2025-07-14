import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { PrismaService } from 'src/core/database/prisma.service';
import { AlreadyExistsError } from 'src/common/errors/already-exists-error';
import { NotFoundError } from 'src/common/errors/not-found-error';
import { UpdateCategoryDto } from './dto/update-category';

@Injectable()
export class CategoryService {
    constructor(private readonly prisma:PrismaService){}
    async create(body:CreateCategoryDto){
        const oldCategory = await this.prisma.category.findFirst({where:{name:body.name}})
        if(oldCategory){
            throw new AlreadyExistsError('category')
        }
        const result = await this.prisma.category.create({data:{name:body.name}})
    }
    async getAll(){
        return await this.prisma.category.findMany()
    }
    async deleteCategory(id:string){
        const oldCategory = await this.prisma.category.findFirst({where:{id:Number(id)}})
        if(!oldCategory){
            throw new NotFoundError('category')
        }
        const result = await this.prisma.category.delete({where:{id:Number(id)}})
        return result
    }
    async update(body:UpdateCategoryDto,id:string){
        const oldCategory = await this.prisma.category.findFirst({where:{id:Number(id)}})
        if(!oldCategory){
            throw new NotFoundError('category')
        }
        const result = await this.prisma.category.update({where:{id:Number(id)},data:{name:body.name}})
        return result
    }
}
