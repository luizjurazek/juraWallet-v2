const connection = require('../config/connection')

const Category = {
    createCategory: async (name_category, id_user) => {
        try {
            const query = 'INSERT INTO category (name_category, id_user) VALUES (?, ?)'
            const result = await connection.promise().query(query, [name_category, id_user])
            return result[0]
        } catch(error){
            throw error
        }
    }

}

module.exports = Category