import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ResultEntity {
    @PrimaryGeneratedColumn()
    id: number;
}
