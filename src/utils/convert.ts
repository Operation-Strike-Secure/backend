import { stateGame } from '../host/api/domain'

export const convertEnumStateGame = (enumStateGame: string): stateGame => {
  switch (enumStateGame) {
    case 'CREATED':
      return stateGame.CREATED
    case 'STARTED':
      return stateGame.STARTED
    case 'ENDED':
      return stateGame.ENDED
    default:
      return stateGame.UNKNOWN
  }
}
