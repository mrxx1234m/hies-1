import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDate, IsNumber, IsOptional, IsPhoneNumber, IsString } from "class-validator";


export class CreatedJobsDto{
    @ApiProperty({example:"Qurulish",description:"Ish nomi"})
    @IsString()
    title:string

    @ApiProperty({example:"Qurulish",description:"category name"})
    @IsString()
    category:string

    @ApiProperty({example:"Uzbekistan",description:"Country name"})
    @IsString()
    country:string

    @ApiProperty({example:60,description:"Work duration for day"})
    @IsNumber()
    duration:number

    @ApiProperty({example:'2025-20-232-23',description:'Work start date'})
    @IsDate()
    startWork:Date

    @ApiProperty({example:'Bu halol va zor ish'})
    @IsString()
    description:string

    @ApiPropertyOptional({example:'998991234567',description:'phone number'})
    @IsOptional()
    @IsPhoneNumber()
    phone?:string

    @ApiProperty({example:"https:",description:'telegram url'})
    @IsOptional()
    @IsString()
    telegram?:string

    @ApiPropertyOptional({example:'https:hies.pixl.uz/asdfasdf.jpeg'})
    @IsOptional()
    @IsString()
    logotip?:string

    @ApiProperty({example:3000,description:"Month salary"})
    @IsNumber()
    salary:number




}