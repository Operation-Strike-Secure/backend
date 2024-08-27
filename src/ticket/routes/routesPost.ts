import express from 'express'
import { configDatabase } from '../../../config/envConfig'
import { RepositoryPostgreSQL } from '../repository/repositoryPostgreSQL'
import { resolverReponseList, resolverInsertTicket, resolverResponseTicket, resolverUpdateState } from '../api/resolver'

const routerPostTicket = express.Router()
const database = new RepositoryPostgreSQL(configDatabase.Postgres)

routerPostTicket.post('/postInsertTicket', (req: express.Request, res: express.Response) => {
  const { title, message, user_id }: { title: string, message: string, user_id: string } = req.body
  resolverInsertTicket(database, title, message, user_id).then((result: any) => {
    if (result === undefined) {
      res.status(404).send('No data found')
    } else {
      res.status(200).json(result)
    }
  }).catch((error) => {
    res.status(500).send(error)
  })
})

routerPostTicket.post('/postDisplayReponse', (req: express.Request, res: express.Response) => {
  const { id }: { id: number } = req.body
  resolverReponseList(database, id).then((result: any) => {
    if (result === undefined) {
      res.status(404).send('No data found')
    } else {
      res.status(200).json(result)
    }
  }).catch((error) => {
    res.status(500).send(error)
  })
})

routerPostTicket.post('/postUpdateState', (req: express.Request, res: express.Response) => {
  const { id, state }: { id: number, state: 'true' | 'false' } = req.body
  resolverUpdateState(database, id, state).then((result: any) => {
    if (result === undefined) {
      res.status(404).send('No data found')
    } else {
      res.status(200).json(result)
    }
  }).catch((error) => {
    res.status(500).send(error)
  })
})

routerPostTicket.post('/postResponseTicket', (req: express.Request, res: express.Response) => {
  const { id, message }: { id: number, message: string } = req.body
  resolverResponseTicket(database, id, message).then((result: any) => {
    if (result === undefined) {
      res.status(404).send('No data found')
    } else {
      res.status(200).json(result)
    }
  }).catch((error) => {
    res.status(500).send(error)
  })
})

export default routerPostTicket
