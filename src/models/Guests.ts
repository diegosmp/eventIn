import { DataTypes } from 'sequelize'
import sequelize from '../../config/sequelize'
import { User } from './User'

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

  event: {
    type: DataTypes.STRING,
  },

  id_user: {
    type: DataTypes.UUID,
    references: {
      model: User,
      key: 'id',
    },
  },
})

User.hasMany(Guests, { foreignKey: 'id_user', as: 'guests' })
Guests.belongsTo(User, { foreignKey: 'id_user', as: 'users' })
