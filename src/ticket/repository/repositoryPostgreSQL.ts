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

  async get(name: "ticket" | "response") : Promise<any> {
    const get_repository = this.db.getRepository(name === "ticket"? TicketEntity : ResponseEntity)
    const response_db = await get_repository.find()
    if (response_db.length == 0)
      return undefined
    return response_db
  }

  async insert_ticket(title: string, message: string) : Promise<any> {
    const insert = new TicketEntity()
    insert.title = title
    insert.message = message
    await this.db.manager.save(insert)
    return {title, message}
  }

  async update_state(id: number, state: 'true' | 'false'): Promise<TicketEntity | null> {
    const get_repository = this.db.getRepository(TicketEntity);
    const ticket = await get_repository.findOneBy({ id });

    if (ticket) {
      ticket.state = state === 'true';
      await get_repository.save(ticket);
      return ticket;
    }
    return null;
  }

  async response_ticket(id: number, message: string): Promise<any> {
    const response = new ResponseEntity()
    const ticketRepository = this.db.getRepository(TicketEntity);
    const ticket = await ticketRepository.findOneBy({ id });
    if (ticket) {
      response.message = message;
      response.ticket_id = id
      await this.db.manager.save(response)
      return {id, message};
    }
    return null
  }
}