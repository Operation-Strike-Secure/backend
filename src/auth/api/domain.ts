export interface RepositoryAuth {
  admin_connection: (identification: string, password: string) => any
  admin_register: (identification: string, password: string) => any
  user_connection: (identification: string, password: string) => any
  user_register: (identification: string, password: string) => any
}
