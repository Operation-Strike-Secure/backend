import { type dataHost, type RepositoryHost } from './domain'

export async function getListTableHost (database: RepositoryHost): Promise<dataHost[] | undefined> {
  const result = await database.getListTable('host')
  return result.data as dataHost[] | undefined
}

export async function insertHost (database: RepositoryHost, host: dataHost): Promise<dataHost | undefined> {
  const result = await database.insertHost(host)
  return result.data as dataHost | undefined
}
