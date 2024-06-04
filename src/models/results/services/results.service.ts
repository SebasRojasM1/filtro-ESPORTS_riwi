import { Injectable } from '@nestjs/common';
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

  findAll() {
    return `This action returns all results`;
  }

  findOne(id: number) {
    return `This action returns a #${id} result`;
  }

  update(id: number, updateResultDto: UpdateResultDto) {
    return `This action updates a #${id} result`;
  }

  remove(id: number) {
    return `This action removes a #${id} result`;
  }
}
