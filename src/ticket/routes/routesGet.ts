import express from 'express'
import { configDatabase } from '../../../config/envConfig'
import { RepositoryPostgreSQL } from '../repository/repositoryPostgreSQL'
import { resolverGetTicketList, resolverGetTicketListById } from '../api/resolver'

const routerGetTicket = express.Router()
const database = new RepositoryPostgreSQL(configDatabase.Postgres)

routerGetTicket.get('/getTicketList', (req: express.Request, res: express.Response) => {
  resolverGetTicketList(database).then((result: any) => {
    if (result === undefined) {
      res.status(404).send('No data found')
    } else {
      res.status(200).json(result)
    }
  }).catch((error) => {
    res.status(500).send(error)
  })
})

routerGetTicket.get('/getTicketList/:id', (req: express.Request, res: express.Response) => {
  const ticketId = req.params.id;
  resolverGetTicketListById(database, ticketId).then((result: any) => {
    if (result === undefined) {
      res.status(404).send('No data found')
    } else {
      res.status(200).json(result)
     }
  }).catch((error) => {
    res.status(500).send(error)
  })
})

export default routerGetTicket
