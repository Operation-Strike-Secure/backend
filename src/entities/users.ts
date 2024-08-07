import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'

@Entity({ name: 'users' })
export class UsersEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
    id: number

  @Column()
    user_id: string

  @Column()
    email: string

  @Column()
    password: string

  @Column({ default: true })
    is_admin: boolean

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date
}
