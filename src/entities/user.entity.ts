import { hashSync } from "bcrypt";
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, BeforeInsert, BeforeUpdate, OneToMany, DeleteDateColumn } from "typeorm";
import { Contact } from "./contacts.entity";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn("increment")
    id: number

    @Column({ length: 45 })
    name: string

    @Column({ length: 45, unique: true })
    email: string

    @Column({ length: 45 })
    phoneNumber: string

    @Column({ length: 120 })
    password: string

    @CreateDateColumn({ type: "date" })
    createdAt: string | Date

    @DeleteDateColumn({ nullable: true })
    deletedAt: string

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword(){
        this.password = hashSync(this.password, 10)
    }

    @OneToMany(() => Contact, (contact) => contact.user)
    contacts: Contact[];
}