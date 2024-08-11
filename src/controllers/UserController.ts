import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { User } from '../models/User'

export default class UserController {
  static async createUser(req: Request, res: Response) {
    const { firstname, lastname, email, password, confirmPass } = req.body

    if (!firstname) {
      return res.status(422).json({ message: 'Campo primeiro nome é obrigatório!' })
    }
    if (!lastname) {
      return res.status(422).json({ message: 'Campo segundo nome é obrigatório!' })
    }
    if (!email) {
      return res.status(422).json({ message: 'Campo email é obrigatório!' })
    }
    if (!password) {
      return res.status(422).json({ message: 'Campo senha é obrigatório!' })
    }
    if (!confirmPass) {
      return res.status(422).json({ message: 'Campo confirmar a senha é obrigatório!' })
    }

    if (password !== confirmPass) {
      return res.status(422).json({ message: 'A senhas não são iguais!' })
    }

    const userExist = await User.findOne({ where: { email } })

    if (userExist) {
      return res.status(422).json({ message: 'Usuário já cadastrado!' })
    }

    const passwordHash = await bcrypt.hash(password, 12)

    try {
      const newUser = await User.create({
        firstname,
        lastname,
        email,
        password: passwordHash,
      })

      return res.status(201).json({ message: 'Usuário cadastyrado com sucesso!', newUser })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'Erro ao conectar com o servidor!' })
    }
  }
}
