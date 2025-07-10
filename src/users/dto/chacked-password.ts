import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ChangePasswordDto{
    @ApiProperty({example:"12345678",description:"Foydalanuvchini "})
    @IsString()
    password:string
}
