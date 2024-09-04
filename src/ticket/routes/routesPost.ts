import express from 'express'
import { configDatabase } from '../../../config/envConfig'
import { RepositoryPostgreSQL } from '../repository/repositoryPostgreSQL'
import { resolverReponseList, resolverInsertTicket, resolverResponseTicket, resolverUpdateState, resolverReponseListById } from '../api/resolver'

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

// TEST

routerPostTicket.post('/postDisplayReponse/:id', (req: express.Request, res: express.Response) => {
  const user_id = req.params.id;
  const { id }: { id: number } = req.body
  resolverReponseListById(database, id, user_id).then((result: any) => {
    if (result === undefined) {
      res.status(404).send('No data found')
    } else {
      res.status(200).json(result)
    }
  }).catch((error) => {
    res.status(500).send(error)
  })
})

// TEST

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
  const { id, message, creator_id }: { id: number, message: string, creator_id: string } = req.body
  resolverResponseTicket(database, id, message, creator_id).then((result: any) => {
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
