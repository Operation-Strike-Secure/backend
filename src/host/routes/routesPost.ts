import express from 'express'
import { configDatabase } from '../../../config/envConfig'
import { insertHost } from '../api/resolver'
import { RepositoryPostgreSQL } from '../repository/repositoryPostgreSQL'
import { stateGame } from '../api/domain'

const routerPostHost = express.Router()
const database = new RepositoryPostgreSQL(configDatabase.Postgres)

routerPostHost.post('/addhost', (req: express.Request, res: express.Response) => {
  const { ip, name } = req.body
  const host = { ip, name, nb_players: 1, state: stateGame.CREATED, created_at: new Date() }
  insertHost(database, host).then((result) => {
    if (result === undefined) {
      res.status(500).send('Error inserting data')
    } else {
      res.status(200).json(result)
    }
  }).catch((error) => {
    res.status(500).send(error)
  })
})

export default routerPostHost
