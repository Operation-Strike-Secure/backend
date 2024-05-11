import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'

@Entity({ name: 'ticket' })
export class TicketEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
    id: number

  @Column()
    title: string

  @Column()
    message: string

  @Column()
    state: boolean

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date
}
