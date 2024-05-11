import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { type RepositoryTicket } from '../api/domain'
import { TicketEntity } from '../../entities/ticket'
import { ResponseEntity } from '../../entities/response'

interface config {
  host: string
  port: number
  username: string
  password: string
  database: string
}

export class RepositoryPostgreSQL implements RepositoryTicket {
  private readonly db: DataSource

  constructor (config: config) {
    this.db = new DataSource({
      type: 'postgres',
      host: config.host,
      port: config.port,
      username: config.username,
      password: config.password,
      database: config.database,
      entities: [TicketEntity, ResponseEntity],
      synchronize: true,
      logging: false
    })

    this.db.initialize().catch((error) => {
      console.error('Error initializing the database', error)
    })
  }

  foo: () => void
}
