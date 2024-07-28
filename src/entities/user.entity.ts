import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity({ name: 'users' })
export class User
{
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false })
    first_name: string

    @Column({ nullable: false })
    last_name: string

    @Column({ nullable: false })
    email: string

    @Column({ nullable: false })
    password: string

    @CreateDateColumn({ type: 'timestamp', nullable: false })
    created_at: Date

    @UpdateDateColumn({ type: 'timestamp', nullable: false })
    updated_at: Date
}
