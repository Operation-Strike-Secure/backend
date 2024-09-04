import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'

@Entity({ name: 'response' })
export class ResponseEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
    id: number

  @Column()
    ticket_id: number

  @Column()
    message: string

  @Column({default: null})
    creator_id: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date
}