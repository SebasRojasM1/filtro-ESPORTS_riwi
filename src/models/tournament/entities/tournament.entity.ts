import { PlayerEntity } from "src/models/players/entities/player.entity";
import { ResultEntity } from "src/models/results/entities/result.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TournamentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nameTournament: string;

    @Column()
    category: string;

    @ManyToOne(() => PlayerEntity, (player) => player.tournaments)
    @JoinColumn({ name: 'player_Id'})
    player: PlayerEntity;

    @OneToMany(() => ResultEntity, (result) => result.player)
    results: ResultEntity[];

    @Column()
    player_Id: number
}
