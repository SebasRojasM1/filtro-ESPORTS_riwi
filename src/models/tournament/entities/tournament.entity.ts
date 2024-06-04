import { PlayerEntity } from "src/models/players/entities/player.entity";
import { ResultEntity } from "src/models/results/entities/result.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TournamentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nameTournament: string;

    @Column()
    category: string;

    @Column()
    gameName: string;

    @ManyToMany(() => PlayerEntity)
    @JoinTable()
    players: PlayerEntity[];

    @OneToMany(() => ResultEntity, result => result.tournament)
    results: ResultEntity[];
}
