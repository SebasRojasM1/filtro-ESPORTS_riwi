import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { TournamentEntity } from '../entities/tournament.entity';
import { CreateTournamentDto, UpdateTournamentDto } from '../dto';
import { PlayerEntity } from 'src/models/players/entities/player.entity';
import { PaginationDto } from 'src/libs/pagination/pagination.dto';

@Injectable()
export class TournamentService {
  constructor(
    @InjectRepository(TournamentEntity) private tournamentRepository: Repository<TournamentEntity>,
    @InjectRepository(PlayerEntity) private playerRepository: Repository<PlayerEntity>,
  ) {}

  
  async createTournament(createTournament: CreateTournamentDto): Promise<TournamentEntity> {
    const { nameTournament, category, gameName, playerIds } = createTournament;

    const playersId = await this.playerRepository.findByIds(playerIds);

    const tournament = this.tournamentRepository.create({
      nameTournament,
      category, 
      gameName,
      players: playersId, //Agrega el array de IDs de jugadores
    });

    return await this.tournamentRepository.save(tournament);
  }

  async findBySearch({ limit, order, page, search, sortBy = 'nameTournament' }: PaginationDto) {
    const [results, total] = await this.tournamentRepository.findAndCount({
      where: {
        nameTournament: ILike(`%${search}%`),
      },
      order: {
        [sortBy]: order,
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      dataFound: total,
      results,
    };
      /*EJEMPLO PETICION: http://localhost:3000/tournament/search?search=PES&sortBy=nameTournament&order=ASC&page=1&limit=1 */
  }

  async findAllTournaments(): Promise<TournamentEntity[]> {

    const tournaments =  await this.tournamentRepository.find({ relations: ['players'] });
  
    if (!tournaments || tournaments.length === 0) {
      throw new HttpException('Tournaments not found. Try again.', HttpStatus.NOT_FOUND);
    }

    return tournaments
  }

  async findOne(id: number): Promise<TournamentEntity> {
    return await this.tournamentRepository.findOne({ 
      where: { id }, 
      relations: ['players'] 
    });
  }

  async updateTournament(id: number, updateTournamentDto: UpdateTournamentDto): Promise<TournamentEntity> {
    await this.tournamentRepository.update(id, updateTournamentDto);

    return await this.tournamentRepository.findOne(
      { where: { id } }
    );
  }

  async deleteTournament(id: number){
    const result = await this.tournamentRepository.softDelete(id);

    if (!result) {
      throw new NotFoundException(`The tournament with ID ${id} was not found`);
    }

    return result
  }
}
