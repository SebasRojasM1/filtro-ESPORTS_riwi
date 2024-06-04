import { TournamentEntity } from "src/models/tournament/entities/tournament.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PlayerEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    namePlayer: string;

    @Column()
    email: string;

    @OneToMany(() => TournamentEntity, (tournament) => tournament.player)
    @JoinColumn({ name: 'tournament_Id'})
    tournaments: TournamentEntity[];

    @Column()
    tournament_Id: number;
}
