import { type RepositoryTicket } from './domain'

export async function resolverGetTicketList (database: RepositoryTicket): Promise<any[] | undefined> {
  const result = await database.get('ticket')
  return result
}

export async function resolverGetTicketListById (database: RepositoryTicket, id: string): Promise<any[] | undefined> {
  const result = await database.get('ticket')
  const filteredResult = result.filter((res: any) => res.creator_id === id)
  return filteredResult
}

export async function resolverReponseList (database: RepositoryTicket, id: number): Promise<any[] | undefined> {
  const result = await database.get('response')
  const filteredResult = result.filter((res: any) => res.ticket_id === id)
  return filteredResult
}

export async function resolverReponseListById (database: RepositoryTicket, id: number, user_id: string): Promise<any[] | undefined> {
  const result = await database.get('response')
  console.log(result)
  const filteredResult = result.filter((res: any) => res.ticket_id === id && res.creator_id === user_id)
  return filteredResult
}

export async function resolverInsertTicket (database: RepositoryTicket, title: string, message: string, user_id: string): Promise<any[] | undefined> {
  const result = await database.insert_ticket(title, message, user_id)
  return result
}

export async function resolverUpdateState (database: RepositoryTicket, id: number, state: 'true' | 'false'): Promise<any[] | undefined> {
  const result = await database.update_state(id, state)
  return result
}

export async function resolverResponseTicket (database: RepositoryTicket, id: number, message: string, creator_id: string): Promise<any[] | undefined> {
  const ticketList = await database.get('ticket')
  const temp = ticketList.filter((res: any) => res.id === id)
  console.log(temp)
  if (temp[0].state !== undefined && temp[0].state !== true) {
    return undefined
  }
  const result = await database.response_ticket(id, message, creator_id)
  return result
}
