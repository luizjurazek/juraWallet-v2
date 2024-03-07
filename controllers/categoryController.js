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
      throw error
    }
  },
  deleteCategoryById: async (req, res) => {
    const id_user = req.userId
    const id_category = req.params.id


    // Verificar se existem transações associadas à categoria
    // const checkTransactionsQuery = 'SELECT COUNT(*) as count FROM transaction WHERE id_user = ?';
    // const checkResult = await connection.promise().query(checkTransactionsQuery, id_user);
    // const transactionCount = checkResult[0][0].count;

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
      throw error
    }
  },
  deleteAllCategories: async (req, res) => {
    const id_user = req.userId

    // Verificar se existem transações associadas à categoria
    // const checkTransactionsQuery = 'SELECT COUNT(*) as count FROM transaction WHERE id_user = ?';
    // const checkResult = await connection.promise().query(checkTransactionsQuery, id_user);
    // const transactionCount = checkResult[0][0].count;

    try {
      const deletedCategories = await Category.destroy({
        where: {
          id_user: id_user
        }
      })

      console.log(deletedCategories)

      if(deletedCategories != 0){
        const response = {
          error: false,
          message: `Foram deletadas ${deletedCategories} categorias`
        }

        res.status(200).json(response)
      } if (deletedCategories === 0){
        const response = {
          error: true,
          message: `Não foram encontradas categorias.`
        }

        res.status(404).json(response)
      } else {
        const response = {
          error: true,
          message: `Houve um erro ao deletar as categorias.`
        }

        res.status(400).json(response)
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
      const editedCategory = await Category.update({
        name_category: category_name
      },
      {
        where: {
          id_user: id_user,
          id_category: id_category
        }
      })

      if (editedCategory[0] === 0){
        const response = {
          error: true,
          message: "Houve um erro ao editar a categoria."
        }

        res.status(404).json(response)
      } else {
        const response = {
          error: false,
          message: "Categoria editada com sucesso."
        }

        res.status(200).json(response)
      }

    } catch (error) {
      throw error
    }
  }

}


module.exports = categoryController