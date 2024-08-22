import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { type RepositoryAuth } from '../api/domain'
import { UsersEntity } from '../../entities/users'
import { hashPassword, comparePassword } from '../../utils/hash'

interface config {
  host: string
  port: number
  username: string
  password: string
  database: string
}

export class RepositoryPostgreSQL implements RepositoryAuth {
  private readonly db: DataSource

  constructor (config: config) {
    this.db = new DataSource({
      type: 'postgres',
      host: config.host,
      port: config.port,
      username: config.username,
      password: config.password,
      database: config.database,
      entities: [UsersEntity],
      synchronize: true,
      logging: false
    })

    this.db.initialize().catch((error) => {
      console.error('Error initializing the database', error)
    })
  }

  async admin_connection (identification: string, password: string): Promise <any> {
    const getRepositoryAuth = this.db.getRepository(UsersEntity)
    const responseBD = await getRepositoryAuth.findOneBy({ email: identification, is_admin: true })
    if (responseBD !== null && comparePassword(password, responseBD.password)) {
      return { identification }
    }
    return undefined
  }

  async user_connection (identification: string, password: string): Promise <any> {
    const getRepositoryAuth = this.db.getRepository(UsersEntity)
    const responseDB = await getRepositoryAuth.findOneBy({ email: identification, is_admin: false })

    if (responseDB !== null && comparePassword(password, responseDB.password)) {
      return { identification }
    }
    return undefined
  }

  async admin_register (identification: string, password: string): Promise<any> {
    const getRepositoryAuth = this.db.getRepository(UsersEntity)
    const responseDB = await getRepositoryAuth.findOneBy({ email: identification })

    if (responseDB !== null) {
      return undefined
    }

    const insert = new UsersEntity()
    insert.email = identification
    insert.password = hashPassword(password)
    insert.user_id = identification
    insert.is_admin = true

    await this.db.manager.save(insert)
    return { identification }
  }

  async user_register (identification: string, password: string): Promise <any> {
    const getRepositoryAuth = this.db.getRepository(UsersEntity)
    const responseDB = await getRepositoryAuth.findOneBy({ email: identification })

    if (responseDB !== null) {
      return undefined
    }

    const insert = new UsersEntity()
    insert.email = identification
    insert.password = hashPassword(password)
    insert.user_id = identification

    await this.db.manager.save(insert)
    return { identification }
  }
}
