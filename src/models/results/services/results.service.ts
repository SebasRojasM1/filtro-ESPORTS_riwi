import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateResultDto, UpdateResultDto } from '../dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ResultEntity } from '../entities/result.entity';
import { Repository } from 'typeorm';
import { PlayerEntity } from 'src/models/players/entities/player.entity';

@Injectable()
export class ResultsService {
  constructor(@InjectRepository(ResultEntity) private resultRepository: Repository<ResultEntity>, 
  @InjectRepository(PlayerEntity) private playerRepository: Repository<PlayerEntity>) {}

  async create(createResult: CreateResultDto): Promise<ResultEntity> {
    const { winnerId, loserId } = createResult;
    
    const winnerPlayer = await this.playerRepository.findOne({ where: { id: winnerId } });
    const loserPlayer = await this.playerRepository.findOne({ where: { id: loserId } });

    const result = this.resultRepository.create({
      ...createResult,
      winnerPlayer,
      loserPlayer,
    });

    return await this.resultRepository.save(result);
  }

  async findAllResults(): Promise<ResultEntity[]> {

    const results =  await this.resultRepository.find({ relations: ['winnerPlayer', 'loserPlayer'] });
  
    if (!results || results.length === 0) {
      throw new HttpException('Results not found. Try again.', HttpStatus.NOT_FOUND);
    }

    return results
  }

  async findOne(id: number): Promise<ResultEntity> {
    return await this.resultRepository.findOne({ 
      where: { id }, 
      relations: ['winnerPlayer', 'loserPlayer'] 
    });
  }

  async updateResults(id: number, UpdateResult: UpdateResultDto): Promise<ResultEntity> {
    await this.resultRepository.update(id, UpdateResult);

    return await this.resultRepository.findOne(
      { where: { id } }
    );
  }

  async deleteResults(id: number){
    const result = await this.resultRepository.softDelete(id);

    if (!result) {
      throw new NotFoundException(`The tournament with ID ${id} was not found`);
    }

    return result
  }
}
