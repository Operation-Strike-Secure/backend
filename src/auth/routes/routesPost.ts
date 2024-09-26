import express from 'express'
import { configDatabase } from '../../../config/envConfig'
import { RepositoryPostgreSQL } from '../repository/repositoryPostgreSQL'
import { isNonEmptyString } from '../../utils/check'
import { resolverAdminConnection, resolverAdminRegister } from '../api/resolver'
import { createToken } from '../../middleware/AuthToken'

const routerPostAuth = express.Router()
const database = new RepositoryPostgreSQL(configDatabase.Postgres)

routerPostAuth.post('/post/admin/connection', (req: express.Request, res: express.Response) => {
  const { identification, password }: { identification: string, password: string } = req.body
  if (!isNonEmptyString(identification) || !isNonEmptyString(password)) {
    res.send("ça n'a pas marché").status(400)
    return
  }
  resolverAdminConnection(database, identification, password).then((result: { id: string, email: string }) => {
    res.send(createToken(result.id, result.email, true)).status(200)
  }).catch((error) =>
    res.send(error).status(400)
  )
})

routerPostAuth.post('/post/admin/register', (req: express.Request, res: express.Response) => {
  const { identification, password, username }: { identification: string, password: string, username: string } = req.body
  if (!isNonEmptyString(identification) || !isNonEmptyString(password)) {
    res.send("ça n'a pas marché").status(400)
    return
  }
  resolverAdminRegister(database, identification, password, username).then((result: { id: string, email: string }) => {
    res.send(createToken(result.id, result.email, true)).status(201)
  }).catch((error) => {
    res.send(error).status(400)
  })
})

routerPostAuth.post('/post/user/connection', (req: express.Request, res: express.Response) => {
  const { identification, password }: { identification: string, password: string } = req.body
  if (!isNonEmptyString(identification) || !isNonEmptyString(password)) {
    res.send("ça n'a pas marché").status(400)
    return
  }
  resolverAdminConnection(database, identification, password).then((result: { id: string, email: string }) => {
    res.send(createToken(result.id, result.email, false)).status(200)
  }).catch((error) =>
    res.send(error).status(400)
  )
})

routerPostAuth.post('/post/user/register', (req: express.Request, res: express.Response) => {
  const { identification, password, username }: { identification: string, password: string, username: string } = req.body
  if (!isNonEmptyString(identification) || !isNonEmptyString(password)) {
    res.send("ça n'a pas marché").status(400)
    return
  }
  resolverAdminRegister(database, identification, password, username).then((result: { id: string, email: string }) => {
    res.send(createToken(result.id, result.email, false)).status(201)
  }).catch((error) => {
    res.send(error).status(400)
  })
})

export default routerPostAuth
