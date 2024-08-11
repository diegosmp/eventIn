import { DataTypes } from 'sequelize'
import sequelize from '../../config/sequelize'

export const Guests = sequelize.define('Guests', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  firstname: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },

  lastname: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },

  cpf: {
    type: DataTypes.STRING(11),
    allowNull: false,
    unique: true,
  },

  tel: {
    type: DataTypes.STRING(25),
    allowNull: false,
    unique: true,
  },
})
