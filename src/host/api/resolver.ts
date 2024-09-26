import { convertEnumStateGame } from '../../utils/convert'
import { type AllDataStat, host_state_enum, type RepositoryHost, type dataHost, type dataUsers } from './domain'

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
  const getUsers = await database.getListTable('player')
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

export async function resolverGetIdUser (database: RepositoryHost): Promise<{ nb_players: number, nb_players_week: number } | undefined> {
  const result = await database.getListTable('player')
  const userList = result.data as dataUsers[] | undefined

  const endDate = new Date()
  const startDate = new Date(endDate.getTime() - (7 * 24 * 60 * 60 * 1000))

  if (userList === undefined || (userList ?? []).length === 0) {
    return undefined
  }
  const recentUsers = userList.filter(user => {
    const createdAt = new Date(user.created_at)
    return createdAt >= startDate && createdAt < endDate
  })

  return { nb_players: userList.length, nb_players_week: recentUsers.length }
}

export async function resolverGetNumberParty (database: RepositoryHost): Promise<{ nb_party: number, nb_party_ended: number } | undefined> {
  const result = await database.getListTable('host')
  const hostList = result.data as dataHost[] | undefined

  if (hostList === undefined || hostList.length === 0) {
    return undefined
  }

  const hostPartiesEnded = hostList.filter((hostItem) => hostItem.state === host_state_enum.ENDED)
  if (hostPartiesEnded.length === 0) {
    return undefined
  }

  return { nb_party: hostList.length, nb_party_ended: hostPartiesEnded.length }
}

export async function resolverGetAllStat (database: RepositoryHost): Promise<AllDataStat> {
  const result = await database.getListTable('host')
  const hostList = result.data as dataHost[] | undefined

  if (hostList === undefined || hostList.length === 0) {
    return { lastDay: [], lastWeek: [], lastMonth: [] }
  }

  const endDate = new Date()
  const startDateDay = new Date(endDate.getTime() - (24 * 60 * 60 * 1000))
  const startDateWeek = new Date(endDate.getTime() - (7 * 24 * 60 * 60 * 1000))
  const startDateMonth = new Date(endDate.getTime() - (30 * 24 * 60 * 60 * 1000))

  const lastDayStats = groupByHour(hostList.filter(hostItem => {
    const createdAt = new Date(hostItem.created_at)
    return createdAt >= startDateDay && createdAt < endDate
  }))

  const lastWeekStats = groupByDay(hostList.filter(hostItem => {
    const createdAt = new Date(hostItem.created_at)
    return createdAt >= startDateWeek && createdAt < endDate
  }))

  const lastMonthStats = groupByDay(hostList.filter(hostItem => {
    const createdAt = new Date(hostItem.created_at)
    return createdAt >= startDateMonth && createdAt < endDate
  }))

  return { lastDay: lastDayStats, lastWeek: lastWeekStats, lastMonth: lastMonthStats }
}

function groupByHour (data: dataHost[]): Array<{ date: string, value: number }> {
  const grouped = data.reduce<Record<string, number>>((acc, curr) => {
    const hour = new Date(curr.created_at).getHours()
    const dateKey = `${new Date(curr.created_at).toISOString().split('T')[0]}T${hour}:00:00Z`

    if (!acc[dateKey]) {
      acc[dateKey] = 0
    }

    acc[dateKey] += curr.nb_players ?? 0

    return acc
  }, {})

  return Object.entries(grouped).map(([date, value]) => ({ date, value }))
}

function groupByDay (data: dataHost[]): Array<{ date: string, value: number }> {
  const grouped = data.reduce<Record<string, number>>((acc, curr) => {
    const day = new Date(curr.created_at).toISOString().split('T')[0]

    if (!acc[day]) {
      acc[day] = 0
    }

    acc[day] += curr.nb_players ?? 0

    return acc
  }, {})

  return Object.entries(grouped).map(([date, value]) => ({ date, value }))
}
