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
            const SelectAllCategoryQuery = 'SELECT id_category, name_category FROM category WHERE id_user = ?';
            const SelectAllCategoryResult = await connection.promise().query(SelectAllCategoryQuery, id_user);
            let response;

            // Verificando se categorias foram encontradas com base no comprimento do resultado de array.
            if (SelectAllCategoryResult[0].length === 0) {
                response = {
                    error: true,
                    message: "Não foram encontradas categorias."
                };
            } else {
                response = {
                    error: false,
                    message: "Categorias encontradas.",
                    categories: SelectAllCategoryResult[0]
                };
            }

            return response;
        } catch (error) {
            throw error;
        }
    },
    getCategoryById: async (id_user, id_category) => {
        try {
            const SelectByIdQuery = 'SELECT id_category, name_category FROM category WHERE id_user = ? AND id_category = ?'
            const SelectByIdResult = await connection.promise().query(SelectByIdQuery, [id_user, id_category]);
            let response;

            let category = SelectByIdResult[0]
            console.log(category)
            // Verificando se categorias foram encontradas com base no comprimento do resultado de array.
            if (category.length === 0) {
                response = {
                    error: true,
                    message: "Categoria não encontrada."
                };
            } else {
                response = {
                    error: false,
                    message: "Categoria encontrada com sucesso.",
                    category: {
                        id: category[0].id_category,
                        name: category[0].name_category
                    }
                };
            }

            return response;
        } catch (error) {
            throw error
        }
    },
    deleteCategoryById: async (id_user, id_category) => {
        try {
            // Verificar se existem transacoes associadas a categoria
            const checkTransactionQuery = 'SELECT COUNT(*) as count FROM transaction WHERE id_category = ? AND id_user = ?'
            const checkResult = await connection.promise().query(checkTransactionQuery, [id_category, id_category])
            const transactionCount = checkResult[0][0].count;
            let response;

            if (transactionCount > 0) {
                response = {
                    error: true,
                    message: "Não é possível excluir a categoria, pois existem transações associadas a ela."
                }
            } else {
                // Se não houver transações, excluir a categoria
                const deleteCategoryQuery = 'DELETE FROM category WHERE id_user = ? AND id_category =  ?'
                const DeleteCategoryResult = await connection.promise().query(deleteCategoryQuery, [id_user, id_category])

                let categoryDeleted = DeleteCategoryResult[0]

                // Verificando se categorias foram encontradas com base no comprimento do resultado de array.
                if (categoryDeleted.affectedRows === 0) {
                    response = {
                        error: true,
                        message: "Categoria não encontrada."
                    };
                } else {
                    response = {
                        error: false,
                        message: "Categoria deletada com sucesso.",
                        categoryId: id_category
                    };
                }
            }


            return response
        } catch (error) {
            throw error
        }
    },
    deleteAllCategories: async (id_user) => {
        try {
            // Verificar se existem transações associadas à categoria
            const checkTransactionsQuery = 'SELECT COUNT(*) as count FROM transaction WHERE id_user = ?';
            const checkResult = await connection.promise().query(checkTransactionsQuery, id_user);
            const transactionCount = checkResult[0][0].count;
            let response;

            if (transactionCount > 0) {
                response = {
                    error: true,
                    message: "Não é possível excluir as categorias, pois existem transações associadas a elas."
                };
            } else {
                const deleteAllCategoriesQuery = 'DELETE FROM category WHERE id_user = ?'
                const deleteAllCategoriesResult = await connection.promise().query(deleteAllCategoriesQuery, id_user)


                // Verificando se categorias foram encontradas com base no comprimento do resultado de array.
                if (deleteAllCategoriesResult[0].affectedRows === 0) {
                    response = {
                        error: true,
                        message: "Categorias não encontradas."
                    };
                } else {
                    response = {
                        error: false,
                        message: "Todas as categorias foram deletadas."
                    };
                }
            }

            return response
        } catch (error) {
            throw error
        }
    },
    editCategory: async (id_user, id_category, name_category) => {
        try {
            const checkCategoryExistsQuery = 'SELECT name_category FROM category WHERE id_category = ? AND id_user = ?'
            const checkCategoryExistsResult = await connection.promise().query(checkCategoryExistsQuery, [id_category, id_user])
            let response;

            if (checkCategoryExistsResult[0].length === 0) {
                response = {
                    error: true,
                    message: "Categoria não encontrada."
                }
            } else {
                const editCategoryQuery = 'UPDATE category SET name_category = ? WHERE id_category = ? AND id_user = ?'
                const editCategoryResult = await connection.promise().query(editCategoryQuery, [name_category, id_category, id_user])


                if (editCategoryResult[0].changedRows == 0) {
                    response = {
                        error: true,
                        message: "Houve um erro ao editar a categoria de id " + id_category
                    }
                } else {
                    let category = checkCategoryExistsResult[0]
                    category = category[0].name_category
                    
                    response = {
                        error: false,
                        message: "Categoria editada com sucesso.",
                        id_category: id_category,
                        cateogry_name: category,
                        new_name: name_category
                    }
                }
            }
            return response
        } catch (error) {
            throw error
        }
    }
};

module.exports = Category;