const connection = require('../config/connection')

const User = {
    createNewUser: async (name, lastname, phonenumber, email, password, birthday) => {
        try {
            const query = 'INSERT INTO users (name, lastname, phonenumber, email, password, birthday) VALUE (?, ?, ?, ?, ?, ?)'
            const result = await connection.promise().query(query, [name, lastname, phonenumber, email, password, birthday])
            return result[0]
        } catch (error) {
            throw error;
        }
    },
    loginUser: async (email) => {
        try {
            const query = 'SELECT * FROM users WHERE email = ?'
            const result = await connection.promise().query(query, email)
            return result[0]
        } catch (error){
            throw error
        }
    }, 
    deleteAccount: async (user_id) => {
        try {
            const query = 'DELETE FROM users WHERE id_user = ?'
            const result = await connection.promise().query(query, user_id)
            return result[0]
        } catch (error){
            throw error
        }
    }
}

module.exports = User;