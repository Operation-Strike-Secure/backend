import { RepositoryTicket } from "./domain"

export async function resolverGetTicketList (database: RepositoryTicket): Promise<any[] | undefined> {
    const result = await database.get('ticket')
    return result
  }

  export async function resolverReponseList (database: RepositoryTicket, id: number): Promise<any[] | undefined> {
    const result = await database.get('response')
    return result.filter((res: any) => res.ticket_id == id)
  }

export async function resolverInsertTicket(database: RepositoryTicket, title: string, message: string): Promise<any[] | undefined> {
    const result = await database.insert_ticket(title, message)
    return result
  }

export async function resolverUpdateState(database: RepositoryTicket, id: number, state: "true" | "false"): Promise<any[] | undefined> {
    const result = await database.update_state(id, state)
    return result
}

export async function resolverResponseTicket(database: RepositoryTicket, id: number, message: string): Promise<any[] | undefined> {
    const ticket_list = await database.get('ticket')
    const temp = ticket_list.filter((res: any) => res.id == id)
    console.log(temp)
    if (!temp[0].state)
        return undefined
    const result = await database.response_ticket(id, message)
    return result
}