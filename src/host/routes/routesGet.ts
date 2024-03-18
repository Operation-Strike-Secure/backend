import express from 'express'
import { configDatabase } from '../../../config/envConfig'
import { type dataHost } from '../api/domain'
import { resolverGetListTableHost } from '../api/resolver'
import { RepositoryPostgreSQL } from '../repository/repositoryPostgreSQL'

const routerGetHost = express.Router()
const database = new RepositoryPostgreSQL(configDatabase.Postgres)

/**
 * Obtenir la liste des hôtes.
 * @swagger
 * /gethostlist:
 *   get:
 *     summary: Récupère la liste des hôtes depuis la base de données.
 *     description: |
 *       Endpoint pour récupérer la liste des hôtes enregistrés dans la base de données.
 *     tags:
 *       - Unreal Engine
 *     responses:
 *       '200':
 *         description: Succès. Retourne la liste des hôtes.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                     description: Identifiant de l'hôte.
 *                   ip:
 *                     type: string
 *                     description: Adresse IP de l'hôte.
 *                   name:
 *                     type: string
 *                     description: Nom de l'hôte.
 *                   nb_players:
 *                     type: number
 *                     description: Nombre de joueurs.
 *                   state:
 *                     type: string
 *                     description: État du jeu.
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                     description: Date de création de l'hôte.
 *       '404':
 *         description: Aucune donnée trouvée.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: No data found
 *       '500':
 *         description: Erreur serveur. Impossible de récupérer la liste des hôtes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message d'erreur.
 */
routerGetHost.get('/gethostlist', (req: express.Request, res: express.Response) => {
  resolverGetListTableHost(database).then((result: dataHost[] | undefined) => {
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
