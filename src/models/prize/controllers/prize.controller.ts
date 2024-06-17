/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { PrizeService } from '../service/prize.service';
import { CreatePrizeDto, UpdatePrizeDto } from '../dto';
import { Cron } from '@nestjs/schedule';
import { PrizeEntity } from '../entities/prize.entity';

@Controller('prize')
export class PrizeController {
  constructor(private readonly prizeService: PrizeService) {}

  @Cron('59 23 * * *', { timeZone: 'America/Bogota' })
  async handleAssignUnclaimedPrizes() {
      await this.prizeService.assignUnclaimedPrizes();
  }
  

  @Post('assign')
  async assignPrize(@Body() createPrize: CreatePrizeDto): Promise<PrizeEntity> {
    return this.prizeService.assignRandomPrize(createPrize);
  }

  @Post()
  async create(@Body() createPrize: CreatePrizeDto): Promise<PrizeEntity> {
    return this.prizeService.createPrize(createPrize);
  }

  @Get()
  async findAll(): Promise<PrizeEntity[]> {
    return this.prizeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<PrizeEntity> {
    return this.prizeService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updatePrize: UpdatePrizeDto): Promise<PrizeEntity> {
    return this.prizeService.update(id, updatePrize);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.prizeService.remove(id);
  }
}
