import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto, UpdatePlayerDto } from '../dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PlayerEntity } from '../entities/player.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlayersService {
  constructor(@InjectRepository(PlayerEntity) private playerRepository: Repository<PlayerEntity>, ) {}


  async create(createPlayer: CreatePlayerDto) {
    const author = this.playerRepository.create(createPlayer);

    return this.playerRepository.save(author);
  }

  async findAllPlayers(): Promise<PlayerEntity[]> {
    const player =  await this.playerRepository.find(
      { relations: ['tournaments'] }
    );

    if (!player || player.length === 0) {
      throw new HttpException('Players not found. Try again.', HttpStatus.NOT_FOUND);
    }

    return player
  }

  async findOne(id: number) {
    const player = this.playerRepository.findOne(
      { where: { id }, 
      relations: ['tournaments'] }
    );

    if (!player) {
      throw new NotFoundException(`The player with ID ${id} not found`);
    }

    return player
  }

  async updatePlayer(id: number, UpdatePlayer: UpdatePlayerDto) {
    await this.playerRepository.update(id, UpdatePlayer);
    
    const updatedPlayer = await this.playerRepository.findOne(
      { where: { id } }
    );
    
    if (!updatedPlayer) {
      throw new HttpException(`The player with ID ${id} not found`, HttpStatus.NOT_FOUND);
    }

    return updatedPlayer;
  }

  async deletePlayer(id: number) {
    const player = await this.playerRepository.findOne({ 
      where: { id } 
    });
    
    if (!player) {
      throw new NotFoundException(`The player with ID ${id} not found`);
    }

    return await this.playerRepository.softDelete(id);
  }
}
