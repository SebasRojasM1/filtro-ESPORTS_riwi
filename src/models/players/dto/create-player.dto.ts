import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreatePlayerDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    namePlayer: string;
  
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    email: string;
}
