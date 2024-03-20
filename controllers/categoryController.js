const Category = require('../models/categoryModel')

const categoryController = {
  createCategory: async (req, res, next) => {
    // #swagger.tags = ['Category']
    // #swagger.description = 'Endpoint para criar uma categoria.'
    const category_name = req.body.category_name
    const id_user = req.userId

    const categoryInBD = await Category.findAll({
      where: {
        id_user,
        name_category: category_name
      }
    })

    try {
      if (!categoryInBD.length == 0) {
        const error = new Error("Categoria já cadastrada.")
        error.statusCode = 400
        throw error
      } 

      const createdCategory = await Category.create({
        name_category: category_name,
        id_user: id_user
      })

      const response = {
        error: false,
        menssage: "Categoria cadastrada com sucesso.",
        category: category_name
      }

      return res.status(201).json(response)
    } catch (error) {
      next(error) 
    }
  },
  getAllCategory: async (req, res) => {
    // #swagger.tags = ['Category']
    // #swagger.description = 'Endpoint para obter todas as categorias.'
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
    // #swagger.tags = ['Category']
    // #swagger.description = 'Endpoint para obter uma categoria usando id.'
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
    // #swagger.tags = ['Category']
    // #swagger.description = 'Endpoint para deletar uma categoria usando id.'
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
      throw error
    }
  },
  deleteAllCategories: async (req, res) => {
    // #swagger.tags = ['Category']
    // #swagger.description = 'Endpoint para deletar todas as categorias.'
    const id_user = req.userId

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
    // #swagger.tags = ['Category']
    // #swagger.description = 'Endpoint para editar uma categoria.'
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