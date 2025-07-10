import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length, MinLength } from "class-validator";

export class RegisterDto{
    @ApiProperty({example:'superadmin@gmail.com',description:'User email '})
    @IsString()
    @IsEmail()
    email:string

    @ApiProperty({example:"Admin",description:"User full name"})
    @IsString()
    @MinLength(3)
    fullName:string

    @ApiProperty({example:"12345678"})
    @IsString()
    @Length(8,22)
    password:string
}