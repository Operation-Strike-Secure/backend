export interface RepositoryTicket {
  get: (name: 'ticket' | 'response') => any
  insert_ticket: (title: string, message: string) => any
  update_state: (id: number, state: 'true' | 'false') => any
  response_ticket: (id: number, message: string) => any
}
