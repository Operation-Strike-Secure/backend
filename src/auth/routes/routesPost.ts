import express from 'express'
import { configDatabase } from '../../../config/envConfig'
import { RepositoryPostgreSQL } from '../repository/repositoryPostgreSQL'
import {isNonEmptyString} from '../../utils/check'
import { resolverAdminConnection, resolverAdminRegister } from '../api/resolver'

const routerPostAuth = express.Router()
const database = new RepositoryPostgreSQL(configDatabase.Postgres)

routerPostAuth.post('/post/admin/connection', async (req: express.Request, res: express.Response) => {
  const {identification, password} = req.body
  if (!isNonEmptyString(identification) || !isNonEmptyString(password)) {
    res.send("ça n'a pas marché").status(400)
  }
  res.send(await resolverAdminConnection(database, identification, password)).status(201)
})

routerPostAuth.post('/post/admin/register', async (req: express.Request, res: express.Response) => {
  const {identification, password} = req.body
  if (!isNonEmptyString(identification) || !isNonEmptyString(password)) {
    res.send("ça n'a pas marché").status(400)
  }
  res.send(await resolverAdminRegister(database, identification, password)).status(201)
})

export default routerPostAuth