import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateCategoryDto{
    @ApiProperty({example:"qurulish",description:'Ish categoriyasi'})
    @IsString()
    name:string
}