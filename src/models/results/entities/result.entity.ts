import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ResultEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    score: number;
}
