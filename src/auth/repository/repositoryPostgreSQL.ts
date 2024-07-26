import 'reflect-metadata'
import { DataSource, ReturningStatementNotSupportedError } from 'typeorm'
import { RepositoryAuth } from '../api/domain'
import { UsersEntity } from '../../entities/users'
import { hashPassword, comparePassword} from '../../utils/hash'

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
  async admin_connection(identification: string, password: string): Promise <any> {
    const get_RepositoryAuth = this.db.getRepository(UsersEntity)
    const response_db = await get_RepositoryAuth.findOneBy({email: identification, is_admin: true})
    if (response_db && comparePassword(password, response_db.password)) {
      console.log("connection ADMIN" + response_db)
      return {identification}
    }
    return undefined
  }
  async user_connection(identification: string, password: string): Promise <any> {
    const get_RepositoryAuth = this.db.getRepository(UsersEntity)
    const response_db = await get_RepositoryAuth.findOneBy({email: identification, is_admin: false})

    if (response_db && comparePassword(password, response_db.password)) {
      console.log("connection USER" + response_db)
      return {identification}
    }
    return undefined
  }

  async admin_register(identification: string, password: string): Promise<any> {
    const get_RepositoryAuth = this.db.getRepository(UsersEntity)
    const response_db = await get_RepositoryAuth.findOneBy({email: identification})

    if (response_db != null) {
      console.log("déjà connecté ADMIN" + response_db)
      return undefined
    }

    const insert = new UsersEntity()
    insert.email = identification
    insert.password = hashPassword(password)
    insert.user_id = identification
    insert.is_admin = true

    await this.db.manager.save(insert)
    return {identification}
  }  

  async user_register(identification: string, password: string): Promise <any> {
    const get_RepositoryAuth = this.db.getRepository(UsersEntity)
    const response_db = await get_RepositoryAuth.findOneBy({email: identification})

    if (response_db) {
      console.log("déjà connecté USER" + response_db)
      return undefined
    }

    const insert = new UsersEntity()
    insert.email = identification
    insert.password = hashPassword(password)
    insert.user_id = identification

    await this.db.manager.save(insert)
    return {identification}
  }
}