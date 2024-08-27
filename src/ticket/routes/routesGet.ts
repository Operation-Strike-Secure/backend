import express from 'express'
import { configDatabase } from '../../../config/envConfig'
import { RepositoryPostgreSQL } from '../repository/repositoryPostgreSQL'
import { resolverGetTicketList } from '../api/resolver'

const routerGetTicket = express.Router()
const database = new RepositoryPostgreSQL(configDatabase.Postgres)

routerGetTicket.get('/getTicketList', (req: express.Request, res: express.Response) => {
  const { id }: { id: string } = req.body                                                          // ICI
  const ticketId = req.params.id;                                                                  // ICI
  resolverGetTicketList(database, ticketId).then((result: any) => {                                // ICI
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
