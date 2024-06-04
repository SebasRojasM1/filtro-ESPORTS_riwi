import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PlayersController } from './models/players/controllers/players.controller';
import { ResultsController } from './models/results/controllers/results.controller';
import { TournamentController } from './models/tournament/controllers/tournament.controller';
import { PlayerEntity } from './models/players/entities/player.entity';
import { ResultEntity } from './models/results/entities/result.entity';
import { TournamentEntity } from './models/tournament/entities/tournament.entity';
import { PlayersService } from './models/players/services/players.service';
import { ResultsService } from './models/results/services/results.service';
import { TournamentService } from './models/tournament/services/tournament.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
      entities: [PlayerEntity, ResultEntity, TournamentEntity],
      extra: {
        ssl: true,
      },
    }),
    TypeOrmModule.forFeature([PlayerEntity, ResultEntity, TournamentEntity]),
  ],
  controllers: [PlayersController, ResultsController, TournamentController],
  providers: [PlayersService, ResultsService, TournamentService],
})
export class AppModule {}