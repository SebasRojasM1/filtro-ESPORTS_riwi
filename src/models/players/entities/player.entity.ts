import { TournamentEntity } from "src/models/tournament/entities/tournament.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

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
}
