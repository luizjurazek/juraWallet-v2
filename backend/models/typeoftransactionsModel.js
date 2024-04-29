const { sequelize } = require('../config/connection')
const { DataTypes } = require('sequelize')

const User = require('../models/userModel')

const TypeOftransaction = sequelize.define('typeOftransaction', {
  id_typeOfTransaction: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  name_typeOfTransaction: {
    type: DataTypes.STRING,
    allowNull: false
  },
  id_user: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id_user'
    }
  }
}, {
  timestamps: false, // Isso habilita a criação automática dos campos createdAt e updatedAt
})

TypeOftransaction.belongsTo(User, { foreignKey: 'id_user' })

module.exports = TypeOftransaction