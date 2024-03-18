export enum stateGame {
  CREATED = 'CREATED',
  STARTED = 'STARTED',
  ENDED = 'ENDED',
  UNKNOWN = 'UNKNOWN'
}

export interface dataUsers {
  id?: number
  ip: string
  created_at: Date
  last_connection?: Date
}

export interface dataHost {
  id?: number
  ip: string
  name?: string
  nb_players?: number
  state?: stateGame
  created_at: Date
}

export interface ResponseData {
  data: dataHost[] | dataUsers[] | dataHost | dataUsers | undefined
  message: string
}

export interface RepositoryHost {
  getListTable: (table: 'host' | 'users') => Promise<ResponseData>
  insertHost: (host: dataHost) => Promise<ResponseData>
  insertUser: (user: dataUsers) => Promise<ResponseData>
  updateHost: (host: dataHost) => Promise<ResponseData>
  updateUser: (user: dataUsers) => Promise<ResponseData>
  deleteHost: (ip: string) => Promise<ResponseData>
  deleteUser: (ip: string) => Promise<ResponseData>
}
