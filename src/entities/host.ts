import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'
import { stateGame } from '../host/api/domain'

@Entity()
export class HostEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
    id: number

  @Column()
    ip: string

  @Column()
    name: string

  @Column()
    nb_players: number

  @Column({ type: 'enum', enum: stateGame, default: 'CREATED' })
    state: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    last_connection: Date
}
