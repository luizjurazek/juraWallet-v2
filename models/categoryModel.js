const {
	sequelize
} = require('../config/connection')
const {
	DataTypes
} = require('sequelize')

const Category = sequelize.define('Category', {
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
}, {
  timestamps: false, // Isso habilita a criação automática dos campos createdAt e updatedAt
})
module.exports = Category;