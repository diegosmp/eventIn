import { Request, Response } from 'express'
import { Guests } from '../models/Guests'

export default class GuestsController {
  static async createGuests(req: Request, res: Response) {
    const { firstname, lastname, email, event, cpf, tel } = req.body

    if (!firstname) {
      return res.status(422).json({ message: 'Primeiro nome obrigatório!' })
    }
    if (!lastname) {
      return res.status(422).json({ message: 'Segundo nome obrigatório!' })
    }
    if (!email) {
      return res.status(422).json({ message: 'Email obrigatório!' })
    }
    if (!event) {
      return res.status(422).json({ message: 'Nome do evento obrigatório!' })
    }
    if (!cpf) {
      return res.status(422).json({ message: 'CPF obrigatório!' })
    }
    if (!tel) {
      return res.status(422).json({ message: 'Telefone obrigatório!' })
    }

    const guestsExist = await Guests.findOne({ where: { email } })

    if (guestsExist) {
      return res.status(422).json({ message: 'Usuário já cadastrado!' })
    }
  }
}
