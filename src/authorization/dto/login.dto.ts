import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class LoginDto{
    @ApiProperty({example:'superadmin@gmail.com',description:"user email"})
    @IsString()
    email:string

    @ApiProperty({example:"12345678",description:'user password'})
    @IsString()
    @Length(8,22)
    password:string

}