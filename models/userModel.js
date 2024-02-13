const { sequelize } = require('../config/connection')
const { DataTypes } = require('sequelize')

const User = sequelize.define('User', {
  id_user: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name_user: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastname_user: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password_user: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phonenumber_user: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email_user: {
    type: DataTypes.STRING,
    allowNull: false
  },
  birthday_user: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  timestamps: false, // Isso habilita a criação automática dos campos createdAt e updatedAt
});

module.exports = User;