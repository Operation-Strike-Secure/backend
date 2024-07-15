import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'

@Entity({ name: 'player' })
export class PlayerEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
    id: number

  @Column()
    ip: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    last_connection: Date
}
