import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PlayerEntity {
    @PrimaryGeneratedColumn()
    id: number;
}
