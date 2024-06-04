import { PlayerEntity } from "src/models/players/entities/player.entity";
import { ResultEntity } from "src/models/results/entities/result.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TournamentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nameTournament: string;

    @Column()
    category: string;

    @OneToMany(() => PlayerEntity, (player) => player.tournaments)
    player: PlayerEntity[];

    @OneToMany(() => ResultEntity, (result) => result.player)
    results: ResultEntity[];
}
