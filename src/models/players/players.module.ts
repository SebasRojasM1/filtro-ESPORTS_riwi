import { Module } from '@nestjs/common';
import { PlayersService } from './services/players.service';
import { PlayersController } from './controllers/players.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrizeEntity } from '../prize/entities/prize.entity';
import { PlayerEntity } from './entities/player.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PrizeEntity, PlayerEntity]),
],
  controllers: [PlayersController],
  providers: [PlayersService],
})
export class PlayersModule {}
