import { stateGame } from '../src/host/api/domain'
import { resolverGetListTableHost, resolverInsertHost, resolverUpdateHostState } from '../src/host/api/resolver'
import { convertEnumStateGame } from '../src/utils/convert'

const date = new Date()

const templateResolverHost = {
  getListTable: async (table: 'host' | 'users') => {
    return {
      data: [
        {
          id: 1,
          ip: '127.0.0.1',
          name: 'Test',
          nb_players: 1,
          state: 'CREATED',
          created_at: date
        }
      ],
      message: 'Data found'
    }
  },
  insertHost: async (host: { ip: string, name: string, nb_players: number, state: string, created_at: Date }) => {
    return {
      data: {
        id: 1,
        ip: '127.0.0.1',
        name: 'Test',
        nb_players: 1,
        state: 'CREATED',
        created_at: date
      },
      message: 'Data inserted'
    }
  },
  insertUser: async (user: { ip: string, created_at: Date, last_connection: Date }) => {
    return {
      data: {
        id: 1,
        ip: '127.0.0.1',
        created_at: date,
        last_connection: date
      },
      message: 'Data inserted'
    }
  },
  updateHost: async (host: { ip: string, name: string, nb_players: number, state: string, created_at: Date }) => {
    return {
      data: {
        id: 1,
        ip: '127.0.0.1',
        name: 'Test',
        nb_players: 1,
        state: 'CREATED',
        created_at: date
      },
      message: 'Data updated'
    }
  },
  updateUser: async (user: { ip: string, created_at: Date, last_connection: Date }) => {
    return {
      data: {
        id: 1,
        ip: '127.0.0.1',
        created_at: date,
        last_connection: date
      },
      message: 'Data updated'
    }
  },
  deleteHost: async (ip: string) => {
    return {
      data: {
        id: 1,
        ip: '127.0.0.1',
        name: 'Test',
        nb_players: 1,
        state: 'CREATED',
        created_at: date
      },
      message: 'Data deleted'
    }
  },
  deleteUser: async (ip: string) => {
    return {
      data: {
        id: 1,
        ip: '127.0.0.1',
        created_at: date,
        last_connection: date
      },
      message: 'Data deleted'
    }
  }
}

describe('Handling host game', () => {
  test('Convert enum state game', () => {
    expect(convertEnumStateGame('CREATED')).toEqual(stateGame.CREATED)
    expect(convertEnumStateGame('STARTED')).toEqual(stateGame.STARTED)
    expect(convertEnumStateGame('ENDED')).toEqual(stateGame.ENDED)
    expect(convertEnumStateGame('')).toEqual(stateGame.UNKNOWN)
  })

  test('Get list of host', async () => {
    const RepositoryHost = templateResolverHost
    const result = await resolverGetListTableHost(RepositoryHost as any)
    expect(result).toEqual([
      {
        id: 1,
        ip: '127.0.0.1',
        name: 'Test',
        nb_players: 1,
        state: 'CREATED',
        created_at: date
      }
    ])
  })

  test('Get Empty list of host', async () => {
    const RepositoryHost = {
      ...templateResolverHost,
      getListTable: async (table: 'host' | 'users') => {
        return {
          data: undefined,
          message: 'Data not found'
        }
      }
    }
    const result = await resolverGetListTableHost(RepositoryHost as any)
    expect(result).toEqual(undefined)
  })

  test('Insert host', async () => {
    const RepositoryHost = {
      ...templateResolverHost,
      insertHost: async (host: { ip: string, name: string, nb_players: number, state: string, created_at: Date }) => {
        return {
          data: {
            id: 1,
            ip: '127.0.10.1',
            name: 'Test',
            nb_players: 1,
            state: stateGame.CREATED,
            created_at: date
          },
          message: 'Data inserted'
        }
      }
    }
    const result = await resolverInsertHost(RepositoryHost as any, {
      id: 1,
      ip: '127.0.10.1',
      name: 'Test',
      nb_players: 1,
      state: stateGame.CREATED,
      created_at: date
    })
    expect(result).toEqual({
      id: 1,
      ip: '127.0.10.1',
      name: 'Test',
      nb_players: 1,
      state: 'CREATED',
      created_at: date
    })
  })

  test('Insert host that already exist', async () => {
    const RepositoryHost = {
      ...templateResolverHost,
      insertHost: async (host: { ip: string, name: string, nb_players: number, state: string, created_at: Date }) => {
        return {
          data: undefined,
          message: 'Data not inserted'
        }
      }
    }
    const result = await resolverInsertHost(RepositoryHost as any, {
      ip: '127.0.10.1',
      name: 'Test',
      nb_players: 1,
      state: stateGame.CREATED,
      created_at: date
    })
    expect(result).toEqual(undefined)
  })

  test('Update host state', async () => {
    const RepositoryHost = {
      ...templateResolverHost,
      updateHost: async (host: { ip: string, name: string, nb_players: number, state: string, created_at: Date }) => {
        return {
          data: {
            id: 1,
            ip: '127.0.0.1',
            name: 'Test',
            nb_players: 1,
            state: stateGame.STARTED,
            created_at: date
          },
          message: 'Data updated'
        }
      }
    }
    const result = await resolverUpdateHostState(RepositoryHost as any, {
      ip: '127.0.0.1',
      state: stateGame.STARTED
    })
    expect(result).toEqual({
      id: 1,
      ip: '127.0.0.1',
      name: 'Test',
      nb_players: 1,
      state: 'STARTED',
      created_at: date
    })
  })

  test('Update host state that does not exist', async () => {
    const RepositoryHost = {
      ...templateResolverHost,
      updateHost: async (host: { ip: string, name: string, nb_players: number, state: string, created_at: Date }) => {
        return {
          data: undefined,
          message: 'Data not updated'
        }
      }
    }
    const result = await resolverUpdateHostState(RepositoryHost as any, {
      ip: '127.0.0.1',
      state: stateGame.STARTED
    })
    expect(result).toEqual(undefined)
  })

  test('Update host state to ended', async () => {
    const RepositoryHost = {
      ...templateResolverHost,
      updateHost: async (host: { ip: string, name: string, nb_players: number, state: string, created_at: Date }) => {
        return {
          data: {
            id: 1,
            ip: '127.0.0.1',
            name: 'Test',
            nb_players: 1,
            state: stateGame.ENDED,
            created_at: date
          },
          message: 'Data updated'
        }
      }
    }
    const result = await resolverUpdateHostState(RepositoryHost as any, {
      ip: '127.0.0.1',
      state: stateGame.ENDED
    })
    expect(result).toEqual({
      id: 1,
      ip: '127.0.0.1',
      name: 'Test',
      nb_players: 1,
      state: 'ENDED',
      created_at: date
    })
  })

  test('HostExist empty', async () => {
    const RepositoryHost = {
      ...templateResolverHost,
      getListTable: async (table: 'host' | 'users') => {
        return {
          data: [{
            ip: '127.0.0.1',
            name: 'Test',
            nb_players: 1,
            state: stateGame.CREATED,
            created_at: date
          }],
          message: 'Data not found'
        }
      }
    }
    const result = await resolverInsertHost(RepositoryHost as any, {
      ip: '127.0.0.1',
      name: 'Test',
      nb_players: 1,
      state: stateGame.CREATED,
      created_at: date
    })
    expect(result).toEqual(undefined)
  })

  test('Update user', async () => {
    const RepositoryHost = {
      ...templateResolverHost,
      getListTable: async (table: 'host' | 'users') => {
        return {
          data: [{
            ip: '127.0.0.1',
            created_at: date,
            last_connection: date
          }],
          message: 'Data found'
        }
      }
    }
    const result = await resolverInsertHost(RepositoryHost as any, {
      ip: '127.0.0.1',
      name: 'Test',
      nb_players: 1,
      state: stateGame.CREATED,
      created_at: date
    })
    expect(result).toEqual({
      id: 1,
      ip: '127.0.0.1',
      name: 'Test',
      nb_players: 1,
      state: 'CREATED',
      created_at: date
    })
  })

  test('Update user not found', async () => {
    const RepositoryHost = {
      ...templateResolverHost,
      getListTable: async (table: 'host' | 'users') => {
        return {
          data: undefined,
          message: 'Data not found'
        }
      }
    }
    const result = await resolverInsertHost(RepositoryHost as any, {
      ip: '127.0.0.1',
      name: 'Test',
      nb_players: 1,
      state: stateGame.CREATED,
      created_at: date
    })
    expect(result).toEqual({
      id: 1,
      ip: '127.0.0.1',
      name: 'Test',
      nb_players: 1,
      state: 'CREATED',
      created_at: date
    })
  })

  test('HostList undefined change state', async () => {
    const RepositoryHost = {
      ...templateResolverHost,
      getListTable: async (table: 'host' | 'users') => {
        return {
          data: undefined,
          message: 'Data not found'
        }
      }
    }
    const result = await resolverUpdateHostState(RepositoryHost as any, {
      ip: '127.0.0.1',
      state: stateGame.STARTED
    })
    expect(result).toEqual(undefined)
  })

  test('HostToUpdate undefined change state', async () => {
    const RepositoryHost = {
      ...templateResolverHost,
      getListTable: async (table: 'host' | 'users') => {
        return {
          data: [{
            ip: '127.0.0.1',
            name: 'Test',
            nb_players: 1,
            state: stateGame.ENDED,
            created_at: date
          }],
          message: 'Data found'
        }
      }
    }
    const result = await resolverUpdateHostState(RepositoryHost as any, {
      ip: '127.0.0.1',
      state: stateGame.STARTED
    })
    expect(result).toEqual(undefined)
  })
})
