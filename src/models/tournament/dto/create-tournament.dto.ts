import { ApiProperty } from "@nestjs/swagger";
import { ArrayMinSize, ArrayNotEmpty, ArrayUnique, IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTournamentDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  nameTournament: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  category: string;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @ArrayUnique()
  @ApiProperty({ type: [Number] })
  playerIds: number[]; 
}

