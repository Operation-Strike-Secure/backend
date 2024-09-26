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

  async admin_connection (identification: string, password: string): Promise <{ email: string, is_admin: boolean, id: number }> {
    const getRepositoryAuth = this.db.getRepository(UsersEntity)
    const responseBD = await getRepositoryAuth.findOneBy({ email: identification, is_admin: true })
    if (responseBD !== null && comparePassword(password, responseBD.password)) {
      return { email: responseBD.email, is_admin: responseBD.is_admin, id: responseBD.id }
    }
    throw new Error('User not found')
  }

  async user_connection (identification: string, password: string): Promise <{ email: string, is_admin: boolean, id: number }> {
    const getRepositoryAuth = this.db.getRepository(UsersEntity)
    const responseDB = await getRepositoryAuth.findOneBy({ email: identification, is_admin: false })

    if (responseDB !== null && comparePassword(password, responseDB.password)) {
      return { email: responseDB.email, is_admin: responseDB.is_admin, id: responseDB.id }
    }
    throw new Error('User not found')
  }

  async admin_register (identification: string, password: string, username: string): Promise <{ email: string, is_admin: boolean, id: number }> {
    const getRepositoryAuth = this.db.getRepository(UsersEntity)
    const responseDB = await getRepositoryAuth.findOneBy({ email: identification })

    if (responseDB !== null) {
      throw new Error('User already exists')
    }

    const insert = new UsersEntity()
    insert.email = identification
    insert.password = hashPassword(password)
    insert.username = username
    insert.user_id = identification
    insert.is_admin = true

    await this.db.manager.save(insert)
    return { email: insert.email, is_admin: insert.is_admin, id: insert.id }
  }

  async user_register (identification: string, password: string, username: string): Promise <{ email: string, is_admin: boolean, id: number }> {
    const getRepositoryAuth = this.db.getRepository(UsersEntity)
    const responseDB = await getRepositoryAuth.findOneBy({ email: identification })

    if (responseDB !== null) {
      throw new Error('User already exists')
    }

    const insert = new UsersEntity()
    insert.email = identification
    insert.password = hashPassword(password)
    insert.user_id = identification
    insert.username = username

    await this.db.manager.save(insert)
    return { email: insert.email, is_admin: insert.is_admin, id: insert.id }
  }
}
