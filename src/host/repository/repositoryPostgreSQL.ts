import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { HostEntity } from '../../entities/host'
import { UserEntity } from '../../entities/users'
import { type ResponseData, type RepositoryHost, type dataHost, type dataUsers } from '../api/domain'

interface config {
  host: string
  port: number
  username: string
  password: string
  database: string
}

export class RepositoryPostgreSQL implements RepositoryHost {
  private readonly db: DataSource

  constructor (config: config) {
    this.db = new DataSource({
      type: 'postgres',
      host: config.host,
      port: config.port,
      username: config.username,
      password: config.password,
      database: config.database,
      entities: [HostEntity, UserEntity],
      synchronize: true,
      logging: false
    })

    this.db.initialize().catch((error) => {
      console.error('Error initializing the database', error)
    })
  }

  async getListTable (table: 'host' | 'users'): Promise<ResponseData> {
    const repository = this.db.getRepository(table === 'host' ? HostEntity : UserEntity)
    const result = await repository.find()
    if (result.length === 0) return { data: undefined, message: 'No data found' }
    // return result.map((row: any) => {
    //   if (table === 'host') {
    //     return {
    //       ip: row.ip,
    //       name: row.name,
    //       nb_players: row.nb_players,
    //       state: row.state,
    //       created_at: row.created_at
    //     }
    //   } else {
    //     return {
    //       ip: row.ip,
    //       created_at: row.created_at,
    //       last_connection: row.last_connection
    //     }
    //   }
    // })
    return { data: result, message: 'Data found' }
  }

  async insertHost (host: dataHost): Promise<ResponseData> {
    const repository = this.db.getRepository(HostEntity)
    await repository.insert(host)
    return { data: host, message: 'Host inserted' }
  }

  async updateHost (host: dataHost): Promise<ResponseData> {
    const repository = this.db.getRepository(HostEntity)
    await repository.update({ ip: host.ip }, host)
    return { data: host, message: 'Host updated' }
  }

  async deleteHost (ip: string): Promise<ResponseData> {
    const repository = this.db.getRepository(HostEntity)
    await repository.delete({ ip })
    return { data: undefined, message: 'Host deleted' }
  }

  async insertUser (user: dataUsers): Promise<ResponseData> {
    const repository = this.db.getRepository(UserEntity)
    await repository.insert(user)
    return { data: user, message: 'User inserted' }
  }

  async updateUser (user: dataUsers): Promise<ResponseData> {
    const repository = this.db.getRepository(UserEntity)
    await repository.update({ ip: user.ip }, user)
    return { data: user, message: 'User updated' }
  }

  async deleteUser (ip: string): Promise<ResponseData> {
    const repository = this.db.getRepository(UserEntity)
    await repository.delete({ ip })
    return { data: undefined, message: 'User deleted' }
  }
}
