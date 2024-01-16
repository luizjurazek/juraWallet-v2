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

}

module.exports = User;