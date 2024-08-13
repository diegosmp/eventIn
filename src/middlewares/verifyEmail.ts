import { Request, Response } from 'express'

const verifyEmail = (email: string, req: Request, res: Response) => {
  const emailVerifyUser = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.[a-z]?$/i

  if (!emailVerifyUser.test(email)) {
    return res.status(422).json({ message: 'E-mail incorreto!' })
  }
}

export default verifyEmail
