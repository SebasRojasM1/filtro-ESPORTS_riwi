import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TournamentEntity {
    @PrimaryGeneratedColumn()
    id: number;
}
