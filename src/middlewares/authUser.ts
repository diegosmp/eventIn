import { NextFunction, Request, Response } from 'express'
import jwt, { Secret } from 'jsonwebtoken'
import dotenv from 'dotenv'
import { User } from '../models/User'

dotenv.config()
const JWT_SCREAT: Secret | any = process.env.JWT_SCREAT

type JWTPlayloud = {
  id: number
}

const authUser = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ message: 'Usuário não autorizado!' })
  }

  const token = authorization.split(' ')[1]

  const decoded = jwt.verify(token, JWT_SCREAT) as JWTPlayloud

  if (!decoded) {
    return res.status(401).json({ message: 'Usuário não autorizado!' })
  }

  const user = await User.findByPk(decoded.id, { attributes: { exclude: ['password'] } })

  req.user = user
  next()
}

export default authUser
