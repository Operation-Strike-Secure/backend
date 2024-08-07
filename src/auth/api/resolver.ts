import { type RepositoryAuth } from './domain'

export async function resolverAdminConnection (database: RepositoryAuth, identification: string, password: string): Promise<any> {
  const result = await database.admin_connection(identification, password)
  return result
}

export async function resolverUserConnection (database: RepositoryAuth, identification: string, password: string): Promise<any> {
  const result = await database.user_connection(identification, password)
  return result
}

export async function resolverAdminRegister (database: RepositoryAuth, identification: string, password: string): Promise<any> {
  const result = await database.admin_register(identification, password)
  return result
}

export async function resolverUserRegister (database: RepositoryAuth, identification: string, password: string): Promise<any> {
  const result = await database.user_register(identification, password)
  return result
}
