import express from 'express'
import cors from 'cors'
import { swagger } from './documentaion'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/docs', swagger.serve, swagger.setup)
/**
 * @swagger
 * /:
 *   get:
 *     summary: Welcome to OSS
 *     description: Welcome to OSS
 *     responses:
 *       200:
 *         description: Welcome to OSS
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *         example: Welcome to OSS
 */
app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Hello World!')
})

app.listen(8080, () => {
  console.log('Server is running on port 8080')
})
