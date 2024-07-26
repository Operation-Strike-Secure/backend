import { type NextFunction, type Request, type Response } from 'express'
import jwt_decode from 'jwt-decode'
import { responseData } from '../utils/constant'
import jwt from 'jsonwebtoken'

export function createToken (id: string, email: string): string {
  const payload = {
    data: {
      id,
      email
    }
  }
  return jwt.sign(payload, process.env.JWT_SECRET ?? 'secret', {
    expiresIn: '1h'
  })
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')

  if (token === null || token === undefined) {
    res.status(401).send(responseData(401, 'Token manquant. L\'authentification est requise.', null))
    return
  }

  const decodedToken: any = jwt_decode(token)
  req.body.userId = decodedToken.data.id
  req.body.userEmail = decodedToken.data.email
  next()
}
