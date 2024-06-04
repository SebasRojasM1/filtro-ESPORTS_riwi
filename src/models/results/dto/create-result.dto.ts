import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsNumber } from "class-validator";

export class CreateResultDto {
    @IsNotEmpty()
    @IsInt()
    @ApiProperty()
    tournamentId: number;

    @IsNotEmpty()
    @IsInt()
    @ApiProperty()
    winnerId: number;

    @IsNotEmpty()
    @IsInt()
    @ApiProperty()
    loserId: number;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    winPoints: number;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    losePoints: number;

}
