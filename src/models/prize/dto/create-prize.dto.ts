/* eslint-disable prettier/prettier */
import { IsBoolean, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Prize } from '../enum/prize.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePrizeDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  prize: Prize;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  playerId: number;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  claimed: boolean;
}
