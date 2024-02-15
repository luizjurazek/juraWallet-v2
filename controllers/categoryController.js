const { response } = require('express')
const Category = require('../models/categoryModel')
const verifyAlreadyExistsItemInBD = require('../utils/verifyAlreadyExistsItemInBD')

const categoryController = {
  createCategory: async (req, res) => {
    const category_name = req.body.category_name
    const id_user = req.userId

    const CategoryAlreadyExists = await verifyAlreadyExistsItemInBD("categories", "name_category", id_user, category_name)

    if (!CategoryAlreadyExists) {
      try {
        const createdCategory = await Category.create({
          name_category: category_name,
          id_user: id_user
        })

        const response = {
          error: false,
          menssage: "Categoria cadastrada com sucesso.",
          category: category_name
        }

        res.status(201).json(response)
      } catch (error) {
        const response = {
          error: true,
          menssage: "Houve um erro no servidor."
        }
        res.status(500).json(response)
        throw error
      }
    } else {
      const response = {
        error: true,
        menssage: "Categoria já existente.",
        category: category_name
      }

      res.status(400).json(response)
    }
  },
  getAllCategory: async (req, res) => {
    const id_user = req.userId

    try {
      const categories = await Category.findAll({
        where: {
          id_user: id_user
        }
      })

      console.log(categories)

      const response = {
        error: false,
        message: "Categorias encontradas com sucesso.",
        categories: categories
      }

      res.status(200).json(response)
    } catch (error) {
      res.status(500).json({
        error: true,
        message: "Houve um erro no servidor."
      })

      throw error
    }
  },
  getCategoryById: async (req, res) => {
    const id_user = req.userId
    const id_category = req.params.id

    try {
      const category = await Category.findOne({
        where: {
          id_user: id_user,
          id_category: id_category
        }
      })

      const response = {
        error: false,
        message: 'Categoria encontrada com sucesso.',
        category: category
      }

      res.status(200).json(responsefea)
    } catch (error) {
      res.status(500).json({
        error: true,
        message: "Houve um erro no servidor."
      })

      throw error
    }
  },
  deleteCategoryById: async (req, res) => {
    const id_user = req.userId
    const id_category = req.params.id

    try {
      const categoryDeleted = await Category.destroy({
        where: {
          id_user: id_user,
          id_category: id_category
        }
      })

      console.log(categoryDeleted)

      if (categoryDeleted == 1) {
        const response = {
          error: false,
          message: "Categoria deletada com sucesso."
        }
  
        return res.status(200).json(response)
      } else if (categoryDeleted == 0) {
        const response = {
          error: true,
          message: "Categoria não encontrada."
        }
  
        return res.status(404).json(response)
      } else {
        const response = {
          error: true,
          message: "Houve um erro ao deletar a categoria."
        }
  
        return res.status(400).json(response)
      }
    } catch (error) {
      res.status(500).json({
        error: true,
        message: "Houve um erro no servidor."
      })

      throw error
    }
  },
  deleteAllCategories: async (req, res) => {
    const id_user = req.userId

    try {
      const deleteCategories = await categoryModel.deleteAllCategories(id_user)
      if (deleteCategories.error == false) {
        res.status(201).json(deleteCategories)
      } else if (deleteCategories.error == true) {
        res.status(400).json(deleteCategories)
      } else {
        res.status(500).json({
          error: true,
          message: "Houve um erro no servidor."
        })
      }
    } catch (error) {
      throw error
    }
  },
  editCategory: async (req, res) => {
    const id_user = req.userId
    const id_category = req.params.id_category
    const category_name = req.params.new_name

    try {
      const editedCategory = await categoryModel.editCategory(id_user, id_category, category_name)

      if (editedCategory.error == false) {
        res.status(201).json(editedCategory)
      } else if (editedCategory.error == true) {
        res.status(400).json(editedCategory)
      } else {
        res.status(500).json({
          error: true,
          message: "Houve um erro no servidor."
        })
      }
    } catch (error) {
      throw error
    }
  }

}


module.exports = categoryController



// const CategoryModel = {
//     // Função para criar uma nova categoria no banco de dados.
//     createCategory: async (name_category, id_user) => {
//         try {
//             const query = 'INSERT INTO category (name_category, id_user) VALUES (?, ?)';
//             const result = await connection.promise().query(query, [name_category, id_user]);
//             let response;

//             // Verificando se a inserção foi bem-sucedida com base no número de linhas afetadas.
//             if (result[0].affectedRows > 0) {
//                 response = {
//                     error: false,
//                     message: "Categoria criada com sucesso.",
//                     id_category: result.insertId,
//                     category: name_category
//                 };
//             } else {
//                 response = {
//                     error: true,
//                     message: "Houve um erro ao criar a categoria.",
//                     category: name_category
//                 };
//             }

//             return response;
//         } catch (error) {
//             throw error;
//         }
//     },

//     // Função para obter todas as categorias de um usuário.
//     getAllCategory: async (id_user) => {
//         try {
//             const SelectAllCategoryQuery = 'SELECT id_category, name_category FROM category WHERE id_user = ?';
//             const SelectAllCategoryResult = await connection.promise().query(SelectAllCategoryQuery, id_user);
//             let response;

//             // Verificando se categorias foram encontradas com base no comprimento do resultado de array.
//             if (SelectAllCategoryResult[0].length === 0) {
//                 response = {
//                     error: true,
//                     message: "Não foram encontradas categorias."
//                 };
//             } else {
//                 response = {
//                     error: false,
//                     message: "Categorias encontradas.",
//                     categories: SelectAllCategoryResult[0]
//                 };
//             }

//             return response;
//         } catch (error) {
//             throw error;
//         }
//     },
//     // funcao para obter categoria por id
//     getCategoryById: async (id_user, id_category) => {
//         try {
//             const SelectByIdQuery = 'SELECT id_category, name_category FROM category WHERE id_user = ? AND id_category = ?'
//             const SelectByIdResult = await connection.promise().query(SelectByIdQuery, [id_user, id_category]);
//             let response;

//             let category = SelectByIdResult[0]
//             console.log(category)
//             // Verificando se categorias foram encontradas com base no comprimento do resultado de array.
//             if (category.length === 0) {
//                 response = {
//                     error: true,
//                     message: "Categoria não encontrada."
//                 };
//             } else {
//                 response = {
//                     error: false,
//                     message: "Categoria encontrada com sucesso.",
//                     category: {
//                         id: category[0].id_category,
//                         name: category[0].name_category
//                     }
//                 };
//             }

//             return response;
//         } catch (error) {
//             throw error
//         }
//     },
//     // Funcao para deleter categoria por id
//     deleteCategoryById: async (id_user, id_category) => {
//         try {
//             // Verificar se existem transacoes associadas a categoria
//             const checkTransactionQuery = 'SELECT COUNT(*) as count FROM transaction WHERE id_category = ? AND id_user = ?'
//             const checkResult = await connection.promise().query(checkTransactionQuery, [id_category, id_category])
//             const transactionCount = checkResult[0][0].count;
//             let response;

//             if (transactionCount > 0) {
//                 response = {
//                     error: true,
//                     message: "Não é possível excluir a categoria, pois existem transações associadas a ela."
//                 }
//             } else {
//                 // Se não houver transações, excluir a categoria
//                 const deleteCategoryQuery = 'DELETE FROM category WHERE id_user = ? AND id_category =  ?'
//                 const DeleteCategoryResult = await connection.promise().query(deleteCategoryQuery, [id_user, id_category])

//                 let categoryDeleted = DeleteCategoryResult[0]

//                 // Verificando se categorias foram encontradas com base no comprimento do resultado de array.
//                 if (categoryDeleted.affectedRows === 0) {
//                     response = {
//                         error: true,
//                         message: "Categoria não encontrada."
//                     };
//                 } else {
//                     response = {
//                         error: false,
//                         message: "Categoria deletada com sucesso.",
//                         categoryId: id_category
//                     };
//                 }
//             }


//             return response
//         } catch (error) {
//             throw error
//         }
//     },
//     // Funcao para deletar todas as categorias
//     deleteAllCategories: async (id_user) => {
//         try {
//             // Verificar se existem transações associadas à categoria
//             const checkTransactionsQuery = 'SELECT COUNT(*) as count FROM transaction WHERE id_user = ?';
//             const checkResult = await connection.promise().query(checkTransactionsQuery, id_user);
//             const transactionCount = checkResult[0][0].count;
//             let response;

//             // Caso a categoria esteja associada a uma ou mais transacoes nao é possível realizar o delete
//             // por conta da foreign key associada no banco de dados
//             // é necessario excluir as transacoes e ai sera possivel deletar as categorias
//             if (transactionCount > 0) {
//                 response = {
//                     error: true,
//                     message: "Não é possível excluir as categorias, existem transações associadas a elas."
//                 };
//             } else {
//                 // caso não haja transacoes associas as categorias faremos o delete
//                 const deleteAllCategoriesQuery = 'DELETE FROM category WHERE id_user = ?'
//                 const deleteAllCategoriesResult = await connection.promise().query(deleteAllCategoriesQuery, id_user)

//                 // Verificando se categorias foram encontradas com base no comprimento do resultado de array.
//                 if (deleteAllCategoriesResult[0].affectedRows === 0) {
//                     response = {
//                         error: true,
//                         message: "Categorias não encontradas."
//                     };
//                 } else {
//                     response = {
//                         error: false,
//                         message: "Todas as categorias foram deletadas."
//                     };
//                 }
//             }

//             return response
//         } catch (error) {
//             throw error
//         }
//     },
//     // funcao para editar uma categoria
//     editCategory: async (id_user, id_category, name_category) => {
//         try {
//             // verifica se existe a categoria 
//             const checkCategoryExistsQuery = 'SELECT name_category FROM category WHERE id_category = ? AND id_user = ?'
//             const checkCategoryExistsResult = await connection.promise().query(checkCategoryExistsQuery, [id_category, id_user])
//             let response;


//             // caso o array checkCategoryExistsResult[0] seja igual a zero 
//             // indica que não há a categoria selecionada para edicao
//             if (checkCategoryExistsResult[0].length === 0) {
//                 response = {
//                     error: true,
//                     message: "Categoria não encontrada."
//                 }
//             } else {
//                 // caso o array checkCategoryExistsResult[0] seja diferente de zero realiza a edicao da categoria encontrada 
//                 const editCategoryQuery = 'UPDATE category SET name_category = ? WHERE id_category = ? AND id_user = ?'
//                 const editCategoryResult = await connection.promise().query(editCategoryQuery, [name_category, id_category, id_user])


//                 if (editCategoryResult[0].changedRows == 0) {
//                     response = {
//                         error: true,
//                         message: "Houve um erro ao editar a categoria de id " + id_category
//                     }
//                 } else {
//                     let category = checkCategoryExistsResult[0]
//                     category = category[0].name_category

//                     response = {
//                         error: false,
//                         message: "Categoria editada com sucesso.",
//                         id_category: id_category,
//                         cateogry_name: category,
//                         new_name: name_category
//                     }
//                 }
//             }
//             return response
//         } catch (error) {
//             throw error
//         }
//     }
// };