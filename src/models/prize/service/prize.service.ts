/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePrizeDto, UpdatePrizeDto } from '../dto';
import { Prize } from '../enum/prize.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { PrizeEntity } from '../entities/prize.entity';
import { PlayerEntity } from 'src/models/players/entities/player.entity';
import { Repository } from 'typeorm';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class PrizeService {
  constructor(
    @InjectRepository(PrizeEntity) private readonly prizeRepository: Repository<PrizeEntity>,
    @InjectRepository(PlayerEntity) private readonly playerRepository: Repository<PlayerEntity>,
) {}

  private readonly prizeInventory = {
    [Prize.PRIZE_1]: 10,
    [Prize.PRIZE_2]: 5,
    [Prize.PRIZE_3]: 1,
  };

// Método para obtener un premio aleatorio del inventario
private getRandomPrize(): Prize {
  // Obtener premios disponibles (con cantidad mayor a 0)
  const availablePrizes = Object.keys(this.prizeInventory).filter(prize => this.prizeInventory[prize] > 0);

  // Si no hay premios disponibles, lanzar excepción
  if (!availablePrizes.length) throw new NotFoundException('No prizes available');

  // Seleccionar un premio aleatorio
  const randomPrize = availablePrizes[Math.floor(Math.random() * availablePrizes.length)] as Prize;

  // Reducir la cantidad del premio seleccionado en el inventario
  this.prizeInventory[randomPrize]--;

  // Devolver el premio seleccionado
  return randomPrize;
}


// Método para asignar un premio aleatorio a un jugador
async assignRandomPrize(createPrizeDto: CreatePrizeDto): Promise<PrizeEntity> {
  const { playerId } = createPrizeDto;

  // Buscar el jugador por su ID
  const player = await this.playerRepository.findOne({ where: { id: playerId } });
  if (!player) throw new NotFoundException('Player not found');

  // Obtener un premio aleatorio del inventario
  const prize = this.getRandomPrize();

  // Crear la entidad del premio asignado
  const assignedPrize = this.prizeRepository.create({
    player,
    prize,
    claimed: true,
    claimedAt: new Date(),
  });
  

  // Guardar y devolver la entidad del premio asignado
  return this.prizeRepository.save(assignedPrize);
}


// Método para crear un nuevo premio (no necesariamente aleatorio)
  async createPrize(createPrizeDto: CreatePrizeDto): Promise<PrizeEntity> {
  const { playerId, prize, claimed } = createPrizeDto;

  // Buscar el jugador por su ID
  const player = await this.playerRepository.findOne({ where: { id: playerId } });
  if (!player) throw new NotFoundException('Player not found');

  // Crear la nueva entidad del premio
  const newPrize = this.prizeRepository.create({
    player,
    prize,
    claimed,
    claimedAt: claimed ? new Date() : null,
  });

  // Guardar y devolver la nueva entidad del premio
  return this.prizeRepository.save(newPrize);
}



  async findAll(): Promise<PrizeEntity[]> {
    return this.prizeRepository.find();
  }


  async findOne(id: number): Promise<PrizeEntity> {
    const prize = await this.prizeRepository.findOne({ where: { id } });

    if (!prize) {
      throw new NotFoundException('Prize not found');
    }

    return prize;
  }

  async update(id: number, updatePrizeDto: UpdatePrizeDto): Promise<PrizeEntity> {
    const prize = await this.prizeRepository.findOne({ where: { id } });

    if (!prize) {
      throw new NotFoundException('Prize not found');
    }

    const { playerId, ...updateData } = updatePrizeDto;
    if (playerId) {
      const player = await this.playerRepository.findOne({ where: { id: playerId } });
      if (!player) {
        throw new NotFoundException('Player not found');
      }
      prize.player = player;
    }

    Object.assign(prize, updateData);
    prize.claimedAt = updateData.claimed ? new Date() : null;
    return this.prizeRepository.save(prize);
  }

  async remove(id: number): Promise<void> {
    const prize = await this.prizeRepository.findOne({ where: { id } });

    if (!prize) {
      throw new NotFoundException('Prize not found');
    }

    await this.prizeRepository.remove(prize);
  }

  @Cron('59 23 * * *', { timeZone: 'America/Bogota' })
  async assignUnclaimedPrizes() {
    const unclaimedPrizes = await this.prizeRepository.find({ where: { claimed: false } });

    const players = await this.playerRepository.find();

    for (const prize of unclaimedPrizes) {
      const randomPlayer = players[Math.floor(Math.random() * players.length)];
      prize.player = randomPlayer;
      prize.claimed = true;
      prize.claimedAt = new Date();
      await this.prizeRepository.save(prize);
    }
  }
}
