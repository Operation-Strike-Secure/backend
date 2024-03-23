import { convertEnumStateGame } from '../../utils/convert'
import { host_state_enum, type RepositoryHost, type dataHost, type dataUsers } from './domain'

export async function resolverGetListTableHost (database: RepositoryHost): Promise<dataHost[] | undefined> {
  const result = await database.getListTable('host')
  return result.data as dataHost[] | undefined
}

export async function resolverInsertHost (database: RepositoryHost, host: dataHost): Promise<dataHost | undefined> {
  // create a new host
  const getHost = await database.getListTable('host')
  const hostList = getHost.data as dataHost[] | undefined
  if (hostList !== undefined) {
    const hostExist = hostList.find((hostItem) => hostItem.ip === host.ip && (hostItem.state === host.state || hostItem.state === host_state_enum.STARTED || hostItem.state === host_state_enum.CREATED))
    if (hostExist !== undefined) {
      return undefined
    }
  }
  const result = await database.insertHost(host)
  // check if the user exists
  const getUsers = await database.getListTable('users')
  const userList = getUsers.data as dataUsers[] | undefined
  if (userList !== undefined) {
    const userExist = userList.find((userItem) => userItem.ip === host.ip)
    if (userExist === undefined) {
      const user = { ip: host.ip, created_at: new Date(), last_connection: new Date() }
      await database.insertUser(user)
    } else {
      userExist.last_connection = new Date()
      await database.updateUser(userExist)
    }
  } else {
    const user = { ip: host.ip, created_at: new Date(), last_connection: new Date() }
    await database.insertUser(user)
  }
  return result.data as dataHost | undefined
}

export async function resolverUpdateHostState (database: RepositoryHost, host: { ip: string, state: host_state_enum }): Promise<dataHost | undefined> {
  const result = await database.getListTable('host')
  const hostList = result.data as dataHost[] | undefined
  if (hostList === undefined) {
    return undefined
  }
  const hostToUpdate = hostList.find((hostItem) => hostItem.ip === host.ip && hostItem.state !== host_state_enum.ENDED)
  if (hostToUpdate === undefined) {
    return undefined
  }
  hostToUpdate.state = convertEnumStateGame(host.state)
  const resultUpdate = await database.updateHost(hostToUpdate)
  return resultUpdate.data as dataHost | undefined
}
