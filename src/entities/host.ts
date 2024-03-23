import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'
import { host_state_enum } from '../host/api/domain'

@Entity({ name: 'host' })
export class HostEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
    id: number

  @Column()
    ip: string

  @Column()
    name: string

  @Column()
    nb_players: number

  @Column({ type: 'enum', enum: host_state_enum, default: host_state_enum.CREATED })
    state: host_state_enum

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date
}
