import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const JWT_SCREAT: string | any = process.env.JWT_SCREAT

const createTokenUser = (user: any, req: Request, res: Response) => {
  const token = jwt.sign(
    {
      userId: user.id,
    },
    JWT_SCREAT,
  )

  if (!token) {
    return res.status(422).json({ message: 'Erro ao conectar com servidor!' })
  }

  return res.status(200).json({ message: 'Token criado com sucesso!', token })
}

export default createTokenUser
