const { sequelize } = require('../config/connection')
const { DataTypes } = require('sequelize')

const Category = {
    id_category: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncremente: true
    },
    name_category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id_user'
        }
    }
}

module.exports = Category;