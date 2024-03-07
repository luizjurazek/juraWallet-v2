const { sequelize } = require('../config/connection')
const { DataTypes } = require('sequelize')

const Transaction = sequelize.define('Transaction', {
    id_transaction: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name_transaction: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price_transaction: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    date_transaction: {
        type: DataTypes.DATE,
        allowNull: false
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id_user'
        }
    },
    id_category: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'categories',
            key: 'id_category'
        }
    },
    id_typeOfTransaction: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'typeoftransactions',
            key: 'id_typeOfTransaction'
        }
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
}, {
    timestamps: false, // Isso habilita a criação automática dos campos createdAt e updatedAt
})

module.exports = Transaction