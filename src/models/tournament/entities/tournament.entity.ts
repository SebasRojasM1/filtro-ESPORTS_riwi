import { Exclude } from "class-transformer";
import { PlayerEntity } from "src/models/players/entities/player.entity";
import { ResultEntity } from "src/models/results/entities/result.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @CreateDateColumn({ type: 'timestamp' })
    createDate: Date;
  
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @DeleteDateColumn({ type: 'timestamp' })
    @Exclude({ toPlainOnly: true })
    deletedAt?: Date;
}
