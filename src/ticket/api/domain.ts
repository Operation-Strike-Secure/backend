export interface RepositoryTicket {
  get: (name: 'ticket' | 'response') => any
  insert_ticket: (title: string, message: string, id: string) => any
  update_state: (id: number, state: 'true' | 'false') => any
  response_ticket: (id: number, message: string, creator_id: string) => any
}
