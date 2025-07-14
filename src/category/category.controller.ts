import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AdminGuard } from 'src/auth/admin.guard';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryService } from './category.service';
import { SuperAdminGuard } from 'src/auth/superadmin.guard';
import { UpdateCategoryDto } from './dto/update-category';

@Controller('category')
export class CategoryController {
    constructor(private readonly service:CategoryService){}
    @ApiOperation({summary:"create category"})
    @ApiBearerAuth()
    @UseGuards(AuthGuard,AdminGuard)
    @Post()
    async create(@Body() body:CreateCategoryDto){
        return this.service.create(body)
    }

    @ApiOperation({summary:'get all category'})
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get()
    async getAll(){
        return this.service.getAll()
    }
    
    @ApiOperation({summary:"udpate category"})
    @ApiBearerAuth()
    @UseGuards(AuthGuard,AdminGuard)
    @Put(':id')
    async update(@Param('id') id:string, @Body() body:UpdateCategoryDto){
        return this.service.update(body,id)
    }

    @ApiOperation({summary:'delete category'})
    @ApiBearerAuth()
    @UseGuards(AuthGuard,AdminGuard)
    @Delete(':id')
    async deleteCategory(@Param('id') id:string){
        return this.service.deleteCategory(id)
    }
}
