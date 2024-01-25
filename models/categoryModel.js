const connection = require('../config/connection')

const Category = {
    // Função para criar uma nova categoria no banco de dados.
    createCategory: async (name_category, id_user) => {
        try {
            const query = 'INSERT INTO category (name_category, id_user) VALUES (?, ?)';
            const result = await connection.promise().query(query, [name_category, id_user]);
            let response;

            // Verificando se a inserção foi bem-sucedida com base no número de linhas afetadas.
            if (result[0].affectedRows > 0) {
                response = {
                    error: false,
                    message: "Categoria criada com sucesso.",
                    id_category: result.insertId,
                    category: name_category
                };
            } else {
                response = {
                    error: true,
                    message: "Houve um erro ao criar a categoria.",
                    category: name_category
                };
            }

            return response;
        } catch (error) {
            throw error;
        }
    },

    // Função para obter todas as categorias de um usuário.
    getAllCategory: async (id_user) => {
        try {
            const query = 'SELECT id_category, name_category FROM category WHERE id_user = ?';
            const result = await connection.promise().query(query, id_user);
            let response;

            // Verificando se categorias foram encontradas com base no comprimento do resultado de array.
            if (result[0].length === 0) {
                response = {
                    error: true,
                    message: "Não foram encontradas categorias."
                };
            } else {
                response = {
                    error: false,
                    message: "Categorias encontradas.",
                    categories: result[0]
                };
            }

            return response;
        } catch (error) {
            throw error;
        }
    }
};

module.exports = Category;
