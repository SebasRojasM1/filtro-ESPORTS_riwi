import { PlayerEntity } from "src/models/players/entities/player.entity";
import { ResultEntity } from "src/models/results/entities/result.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TournamentEntity {
    @PrimaryGeneratedColumn()
    id: number;
}
