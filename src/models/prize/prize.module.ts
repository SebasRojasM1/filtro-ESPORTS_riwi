import { Module } from '@nestjs/common';
import { PrizeService } from './service/prize.service';
import { PrizeController } from './controllers/prize.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrizeEntity } from './entities/prize.entity';
import { PlayerEntity } from '../players/entities/player.entity';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    TypeOrmModule.forFeature([PrizeEntity, PlayerEntity]),
    ScheduleModule.forRoot(),
],
  controllers: [PrizeController],
  providers: [PrizeService],
})
export class PrizeModule {}
