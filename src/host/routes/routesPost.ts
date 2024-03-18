import express from 'express'
import { configDatabase } from '../../../config/envConfig'
import { resolverInsertHost, resolverUpdateHostState } from '../api/resolver'
import { RepositoryPostgreSQL } from '../repository/repositoryPostgreSQL'
import { stateGame } from '../api/domain'

const routerPostHost = express.Router()
const database = new RepositoryPostgreSQL(configDatabase.Postgres)

/**
 * Ajouter un hôte.
 * @swagger
 * /addhost:
 *   post:
 *     summary: Ajoute un hôte à la base de données.
 *     description: Endpoint pour ajouter un hôte avec une adresse IP et un nom spécifiés.
 *     tags:
 *       - Unreal Engine
 *     parameters:
 *       - in: body
 *         name: host
 *         description: Données de l'hôte à ajouter.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             ip:
 *               type: string
 *               description: Adresse IP de l'hôte.
 *             name:
 *               type: string
 *               description: Nom de l'hôte.
 *     responses:
 *       '200':
 *         description: Succès. Retourne les données de l'hôte ajouté.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   description: Identifiant de l'hôte.
 *                 ip:
 *                   type: string
 *                   description: Adresse IP de l'hôte.
 *                 name:
 *                   type: string
 *                   description: Nom de l'hôte.
 *                 nb_players:
 *                   type: number
 *                   description: Nombre de joueurs.
 *                 state:
 *                   type: string
 *                   description: État du jeu.
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   description: Date de création de l'hôte.
 *       '500':
 *         description: Erreur serveur. Impossible d'ajouter l'hôte.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message d'erreur.
 */
routerPostHost.post('/addhost', (req: express.Request, res: express.Response) => {
  const { ip, name } = req.body
  const host = { ip, name, nb_players: 1, state: stateGame.CREATED, created_at: new Date() }
  resolverInsertHost(database, host).then((result) => {
    if (result === undefined) {
      res.status(500).send('Error inserting data')
    } else {
      res.status(200).json(result)
    }
  }).catch((error) => {
    res.status(500).send(error)
  })
})

/**
 * Mettre à jour l'état d'un hôte.
 * @swagger
 * /updatehost/state:
 *   post:
 *     summary: Met à jour l'état d'un hôte dans la base de données.
 *     description: Endpoint pour mettre à jour l'état d'un hôte spécifié par son adresse IP.
 *     tags:
 *       - Unreal Engine
 *     parameters:
 *       - in: body
 *         name: host
 *         description: Données de l'hôte à mettre à jour.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             ip:
 *               type: string
 *               description: Adresse IP de l'hôte à mettre à jour.
 *             state:
 *               type: string
 *               description: Nouvel état de l'hôte.
 *     responses:
 *       '200':
 *         description: Succès. Retourne les données de l'hôte mises à jour.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   description: Identifiant de l'hôte.
 *                 ip:
 *                   type: string
 *                   description: Adresse IP de l'hôte.
 *                 name:
 *                   type: string
 *                   description: Nom de l'hôte.
 *                 nb_players:
 *                   type: number
 *                   description: Nombre de joueurs.
 *                 state:
 *                   type: string
 *                   description: État du jeu.
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   description: Date de création de l'hôte.
 *       '500':
 *         description: Erreur serveur. Impossible de mettre à jour l'hôte.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message d'erreur.
 */
routerPostHost.post('/updatehost/state', (req: express.Request, res: express.Response) => {
  const { ip, state } = req.body
  const host = { ip, state }
  resolverUpdateHostState(database, host).then((result) => {
    if (result === undefined) {
      res.status(500).send('Error updating data')
    } else {
      res.status(200).json(result)
    }
  }).catch((error) => {
    res.status(500).send(error)
  })
})

export default routerPostHost
