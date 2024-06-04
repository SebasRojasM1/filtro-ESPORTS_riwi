import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTournamentDto, UpdateTournamentDto } from '../dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TournamentEntity } from '../entities/tournament.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TournamentService {
  constructor(
    @InjectRepository(TournamentEntity) private tournamentRepository: Repository<TournamentEntity>, 
    ) {}

  create(createTournament: CreateTournamentDto) {
    const author = this.tournamentRepository.create(createTournament);

    return this.tournamentRepository.save(author);
  }

  findAllTournaments(): Promise<TournamentEntity[]> {
    return this.tournamentRepository.find({ relations: ['player'] });
  }

  findOne(id: number): Promise<TournamentEntity> {
    return this.tournamentRepository.findOne({ 
      where: { id }, 
      relations: ['player'] 
    });  
  }

  async updateATournament(id: number, UpdateTournament: UpdateTournamentDto): Promise<TournamentEntity> {
    await this.tournamentRepository.update(id, UpdateTournament);
    
    const updateTournament = await this.tournamentRepository.findOne(
      { where: { id } }
    );
    
    if (!updateTournament) {
      throw new HttpException(`The tournament with ID ${id} not found`, HttpStatus.NOT_FOUND);
    }

    return updateTournament;
  }

  async deleteTournament(id: number) {
    const tournament = await this.tournamentRepository.findOne({ where: { id } });

    if (!tournament) {
      throw new NotFoundException(`The tournament with ID ${id} its not found`);
    }

    return await this.tournamentRepository.softDelete(id);
  }
}
