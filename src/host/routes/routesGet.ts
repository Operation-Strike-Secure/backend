import express from 'express'
import { configDatabase } from '../../../config/envConfig'
import { type dataHost } from '../api/domain'
import { getListTableHost } from '../api/resolver'
import { RepositoryPostgreSQL } from '../repository/repositoryPostgreSQL'

const routerGetHost = express.Router()
const database = new RepositoryPostgreSQL(configDatabase.Postgres)

routerGetHost.get('/gethostlist', (req: express.Request, res: express.Response) => {
  getListTableHost(database).then((result: dataHost[] | undefined) => {
    if (result === undefined) {
      res.status(404).send('No data found')
    } else {
      res.status(200).json(result)
    }
  }).catch((error) => {
    res.status(500).send(error)
  })
})

export default routerGetHost
