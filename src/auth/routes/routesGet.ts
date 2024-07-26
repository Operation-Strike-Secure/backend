import express from 'express'
import { configDatabase } from '../../../config/envConfig'
import { RepositoryPostgreSQL } from '../repository/repositoryPostgreSQL'

const routerGetAuth = express.Router()
const database = new RepositoryPostgreSQL(configDatabase.Postgres)



  export default routerGetAuth