import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TournamentEntity } from '../entities/tournament.entity';
import { CreateTournamentDto, UpdateTournamentDto } from '../dto';
import { PlayerEntity } from 'src/models/players/entities/player.entity';

@Injectable()
export class TournamentService {
  constructor(
    @InjectRepository(TournamentEntity) private tournamentRepository: Repository<TournamentEntity>,
    @InjectRepository(PlayerEntity) private playerRepository: Repository<PlayerEntity>,
  ) {}

  async create(createTournament: CreateTournamentDto): Promise<TournamentEntity> {
    const { nameTournament, category, playerIds } = createTournament;

    const playersIds = await this.playerRepository.findByIds(playerIds);

    const tournament = this.tournamentRepository.create({
      nameTournament,
      category,
      players: playersIds, //Agrega el array de IDs de jugadores
    });

    return await this.tournamentRepository.save(tournament);
  }

  async findAllTournaments(): Promise<TournamentEntity[]> {
    return await this.tournamentRepository.find({ relations: ['players'] });
  }

  async findOne(id: number): Promise<TournamentEntity> {
    return await this.tournamentRepository.findOne({ where: { id }, relations: ['players'] });
  }

  async updateTournament(id: number, updateTournamentDto: UpdateTournamentDto): Promise<TournamentEntity> {
    await this.tournamentRepository.update(id, updateTournamentDto);
    return await this.tournamentRepository.findOne(
      { where: { id } }
    );
  }

  async deleteTournament(id: number): Promise<void> {
    const result = await this.tournamentRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`The tournament with ID ${id} was not found`);
    }
  }
}
