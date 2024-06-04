import { Exclude } from "class-transformer";
import { PlayerEntity } from "src/models/players/entities/player.entity";
import { TournamentEntity } from "src/models/tournament/entities/tournament.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class ResultEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => TournamentEntity, tournament => tournament.results)
    tournament: TournamentEntity;

    @ManyToOne(() => PlayerEntity, player => player.winner)
    winnerPlayer: PlayerEntity;

    @ManyToOne(() => PlayerEntity, player => player.loser)
    loserPlayer: PlayerEntity;

    @Column()
    winPoints: number;

    @Column()
    losePoints: number;

    @CreateDateColumn({ type: 'timestamp' })
    createDate: Date;
  
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @DeleteDateColumn({ type: 'timestamp' })
    @Exclude({ toPlainOnly: true })
    deletedAt?: Date;
}
