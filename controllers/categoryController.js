const categoryModel = require('../models/categoryModel')
const verifyAlreadyExistsItemInBD = require('../utils/verifyAlreadyExistsItemInBD')

const categoryController = {
    createCategory: async (req, res) => {
        const category_name = req.body.category_name
        const id_user = req.userId

        const CategoryAlreadyExists = await verifyAlreadyExistsItemInBD("category", "name_category", id_user, category_name)

        if(!CategoryAlreadyExists){
            try {
                const createdCategory = await categoryModel.createCategory(category_name, id_user)
    
                if (createdCategory.affectedRows > 0) {
                    const response = {
                        error: false,
                        menssage: "Categoria criada com sucesso.",
                        id_category: createdCategory.insertId,
                        category: category_name
                    }
    
                    res.status(201).json(response)
                } else {
                    const response = {
                        error: true,
                        menssage: "Houve um erro ao criar a categoria.",
                        category: category_name
                    }
    
                    res.status(400).json(response)
                }
            } catch(error){
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
    }
}


module.exports = categoryController