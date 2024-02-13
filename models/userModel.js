const { sequelize } = require('../config/connection')
const { DataTypes } = require('sequelize')

let User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phonenumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  birthday: {
    type: DataTypes.DATE,
    allowNull: false
  }
})


// User = {
//   createNewUser: async (name, lastname, phonenumber, email, password, birthday) => {
//     try {
//       const query = 'INSERT INTO user (name_user, lastname_user, phonenumber_user, email_user, password_user, birthday_user) VALUES (?, ?, ?, ?, ?, ?)'
//       const result = await connection.promise().query(query, [name, lastname, phonenumber, email, password, birthday])
//       return result[0]
//     } catch (error) {
//       throw error;
//     }
//   },
//   loginUser: async (email) => {
//     try {
//       const query = 'SELECT * FROM user WHERE email_user = ?'
//       const result = await connection.promise().query(query, email)
//       return result[0]
//     } catch (error) {
//       throw error
//     }
//   },
//   deleteAccount: async (user_id) => {
//     try {
//       const query = 'DELETE FROM user WHERE id_user = ?'
//       const result = await connection.promise().query(query, user_id)
//       return result[0]
//     } catch (error) {
//       throw error
//     }
//   }
// }

module.exports = User;