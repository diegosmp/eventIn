import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { User } from '../models/User'
import createTokenUser from '../middlewares/createTokenUser'

export default class UserController {
  static async createUser(req: Request, res: Response) {
    const { firstname, lastname, email, password, confirmPass } = req.body

    if (!firstname) {
      return res.status(422).json({ message: 'Campo primeiro nome é obrigatório!' })
    }
    if (!lastname) {
      return res.status(422).json({ message: 'Campo segundo nome é obrigatório!' })
    }

    const emailVerifyUser = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]/i
    console.log(!emailVerifyUser.test(email))

    if (!emailVerifyUser.test(email)) {
      return res.status(422).json({ message: 'E-mail incorreto!' })
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

      createTokenUser(newUser, req, res)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'Erro ao conectar com o servidor!' })
    }
  }

  static async loginUser(req: Request, res: Response) {
    const { email, password } = req.body

    if (!email) {
      return res.status(422).json({ message: 'Campo email é obrigatório!' })
    }
    if (!password) {
      return res.status(422).json({ message: 'Campo senha é obrigatório!' })
    }

    const user = await User.findOne({ where: { email } })

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado!' })
    }

    try {
      createTokenUser(user, req, res)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'Erro ao conectar com o servidor!' })
    }
  }

  static async editUser(req: Request, res: Response) {
    const { firstname, lastname, email } = req.body
    const { userId } = req.params

    if (!firstname) {
      return res.status(422).json({ message: 'Campo primeiro nome é obrigatório!' })
    }
    if (!lastname) {
      return res.status(422).json({ message: 'Campo segundo nome é obrigatório!' })
    }
    if (!email) {
      return res.status(422).json({ message: 'Campo email é obrigatório!' })
    }

    const user = await User.findByPk(userId)

    if (!user) {
      return res.status(404).json({ message: 'Usuário não cadastrado!' })
    }

    try {
      await User.update(
        {
          firstname,
          lastname,
          email,
        },
        { where: { id: userId } },
      )

      return res.status(200).json({ message: 'Usuário atualizado com sucesso!' })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'Erro ao conectar com o servidor!' })
    }
  }

  static async userDelete(req: Request, res: Response) {
    const { userId } = req.params

    const user = await User.findByPk(userId)

    if (!user) {
      return res.status(404).json({ message: 'Usuário não cadastrado!' })
    }

    try {
      await User.destroy({ where: { id: userId } })

      return res.status(200).json({ message: 'Usuário deletado com sucesso!' })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'Erro ao conectar com o servidor!' })
    }
  }
}
