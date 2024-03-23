import cors from 'cors'
import express from 'express'
import { swagger } from './documentaion'
import routerGetHost from './host/routes/routesGet'
import routerPostHost from './host/routes/routesPost'
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())
app.use('/docs', swagger.serve, swagger.setup)

app.use('/api', routerGetHost)
app.use('/api', routerPostHost)

app.listen(8080, () => {
  console.log('Server is running on port 8080')
})
