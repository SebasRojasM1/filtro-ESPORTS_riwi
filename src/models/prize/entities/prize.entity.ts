import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { PlayerEntity } from '../../players/entities/player.entity';
import { Prize } from '../enum/prize.enum';

@Entity()
export class PrizeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => PlayerEntity, player => player.assignedPrizes)
    player: PlayerEntity;

    @Column({ type: 'enum', enum: Prize })
    prize: Prize;

    @Column({ default: false })
    claimed: boolean;

    @CreateDateColumn({ type: 'timestamp' })
    claimedAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @DeleteDateColumn({ type: 'timestamp'})
    deleteAt: Date;
}
