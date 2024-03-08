import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'

@Entity()
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
    id: number

  @Column()
    ip: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date
}
