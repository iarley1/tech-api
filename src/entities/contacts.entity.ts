import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from "typeorm";
import { User } from "./user.entity";

@Entity("contacts")
export class Contact {
    @PrimaryGeneratedColumn("increment")
    id: number

    @Column({ length: 45 })
    name: string

    @Column({ length: 45, unique: true })
    email: string

    @Column({ length: 45 })
    phoneNumber: string

    @CreateDateColumn({ type: "date" })
    createdAt: string | Date

    @ManyToOne(() => User, user => user.contacts)
    user: User;
}