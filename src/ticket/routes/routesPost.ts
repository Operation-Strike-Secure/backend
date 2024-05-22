import express from 'express'
import { configDatabase } from '../../../config/envConfig'
import { RepositoryPostgreSQL } from '../repository/repositoryPostgreSQL'
import { resolverReponseList, resolverInsertTicket, resolverResponseTicket, resolverUpdateState } from '../api/resolver'

const routerPostTicket = express.Router()
const database = new RepositoryPostgreSQL(configDatabase.Postgres)

routerPostTicket.post('/postInsertTicket', (req: express.Request, res: express.Response) => {
    const {title, message} = req.body
    resolverInsertTicket(database, title, message).then((result: any) => {
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
    const {id} = req.body
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
    const {id} = req.body
    const {state} = req.body
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
    const {id} = req.body
    const {message} = req.body
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