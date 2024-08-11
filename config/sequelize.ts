import { Sequelize } from 'sequelize'

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'db/eventSchool.sqlite',
})

export default sequelize
