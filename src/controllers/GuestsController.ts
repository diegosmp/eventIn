import { Request, Response } from 'express'
import { Guests } from '../models/Guests'
import { User } from '../models/User'

export default class GuestsController {
  static async createGuests(req: Request, res: Response) {
    const { firstname, lastname, email, event, cpf, tel, city } = req.body
    const { userId } = req.params

    const cleanedCpf = cpf.replace(/[^\d]/g, '')
    const guestsExist: any = await Guests.findOne({ where: { email } })
    const telExist = await Guests.findOne({ where: { tel } })
    const cpfExist = await Guests.findOne({ where: { cpf: cleanedCpf } })

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
    if (cpfExist) {
      return res.status(422).json({ message: 'CPF já cadastrado!' })
    }

    if (!tel) {
      return res.status(422).json({ message: 'Telefone obrigatório!' })
    }
    const regex = /^(\d{2,3})\d{9}$/
    if (regex.test(tel)) {
      return res.status(422).json({ message: 'Telefone incorreto!' })
    }
    if (telExist) {
      return res.status(422).json({ message: 'Telefone já cadastrado!' })
    }
    if (!city) {
      return res.status(422).json({ message: 'Cidade obrigatório!' })
    }

    if (guestsExist) {
      return res.status(422).json({ message: 'Usuário já cadastrado!' })
    }

    try {
      const newGuests = await Guests.create(
        {
          firstname,
          lastname,
          email,
          event,
          cpf: cleanedCpf,
          tel,
          city,
          id_user: userId,
        },
        {
          include: {
            model: User,
            as: 'users',
          },
        },
      )

      return res.status(201).json({ message: 'Convidado cadastrado com sucesso!', newGuests })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'Erro ao conecctar com servidor!' })
    }
  }

  static async allGuests(req: Request, res: Response) {
    const guests = await Guests.findAll()

    if (!guests) {
      return res.status(200).json({ message: 'Nenhum convidado cadastrado!' })
    }
    try {
      return res.status(200).json({ message: guests })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'Erro ao conecctar com servidor!' })
    }
  }

  static async editGuests(req: Request, res: Response) {
    const { firstname, lastname, email, event, cpf, tel, city } = req.body
    const { userId } = req.params

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

    if (!guestsExist) {
      return res.status(422).json({ message: 'Usuário não cadastrado!' })
    }

    try {
      const cleanedCpf = cpf.replace(/[^\d]/g, '')
      await Guests.update(
        {
          firstname,
          lastname,
          email,
          event,
          cpf: cleanedCpf,
          tel,
          city,
        },
        { where: { id: { userId } } },
      )
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'Erro ao conecctar com servidor!' })
    }
  }

  static async deleteGuests(req: Request, res: Response) {
    const { guestId } = req.params
    const guestExist = await Guests.findByPk(guestId)

    if (!guestExist) {
      return res.status(404).json({ message: 'Convidado não cadastrado!' })
    }

    try {
      await Guests.destroy({ where: { id: guestId } })
      return res.status(200).json({ message: 'Convidado deletado com sucesso!' })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'Erro ao conecctar com servidor!' })
    }
  }
}
