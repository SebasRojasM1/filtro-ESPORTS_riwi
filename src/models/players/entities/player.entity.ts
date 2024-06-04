import { ResultEntity } from "src/models/results/entities/result.entity";
import { TournamentEntity } from "src/models/tournament/entities/tournament.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class PlayerEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    namePlayer: string;

    @Column()
    email: string;

    @ManyToMany(() => TournamentEntity, tournament => tournament.players)
    tournaments: TournamentEntity[];

    @OneToMany(() => ResultEntity, result => result.winnerPlayer)
    winner: ResultEntity[];

    @OneToMany(() => ResultEntity, result => result.loserPlayer)
    loser: ResultEntity[];

    @CreateDateColumn({ type: 'timestamp' })
    createDate: Date;
  
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}
