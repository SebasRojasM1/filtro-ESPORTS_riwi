import { Module } from '@nestjs/common';
import { TournamentService } from './services/tournament.service';
import { TournamentController } from './controllers/tournament.controller';

@Module({
  controllers: [TournamentController],
  providers: [TournamentService],
})
export class TournamentModule {}
