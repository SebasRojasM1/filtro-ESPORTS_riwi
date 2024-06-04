import { TournamentEntity } from "src/models/tournament/entities/tournament.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PlayerEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    namePlayer: string;

    @Column()
    email: string;

    @OneToMany(() => TournamentEntity, (tournament) => tournament.player)
    tournaments: TournamentEntity[];
}
