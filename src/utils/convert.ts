import { host_state_enum } from '../host/api/domain'

export const convertEnumStateGame = (enumStateGame: string): host_state_enum => {
  switch (enumStateGame) {
    case 'CREATED':
      return host_state_enum.CREATED
    case 'STARTED':
      return host_state_enum.STARTED
    case 'ENDED':
      return host_state_enum.ENDED
    default:
      return host_state_enum.UNKNOWN
  }
}
