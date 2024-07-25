import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity({ name: 'users' })
export class User
{
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: true })
    first_name: string

    @Column({ nullable: true })
    last_name: string

    @Column({ nullable: true })
    email: string

    @Column({ nullable: true })
    password: string

    @CreateDateColumn({ type: 'timestamp', nullable: true })
    created_at: Date

    @UpdateDateColumn({ type: 'timestamp', nullable: true })
    updated_at: Date
}
