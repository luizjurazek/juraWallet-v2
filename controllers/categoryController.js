const connection = require('../config/connection')
const categoryModel = require('../models/categoryModel')
const { connect } = require('../routes/routesUser')
const verifyAlreadyExistsItemInBD = require('../utils/verifyAlreadyExistsItemInBD')

const categoryController = {
    createCategory: async (req, res) => {
        const category_name = req.body.category_name
        const id_user = req.userId

        const CategoryAlreadyExists = await verifyAlreadyExistsItemInBD("category", "name_category", id_user, category_name)

        if(!CategoryAlreadyExists){
            try {
                const createdCategory = await categoryModel.createCategory(category_name, id_user)
                
                if(createdCategory.error == false){
                    res.status(201).json(createdCategory)
                } else if (createdCategory.error == true) {
                    res.status(400).json(createdCategory)
                } else {
                    res.status(500).json({
                        error: true,
                        message: "Houve um erro no servidor."
                    })
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
    },
    getAllCategory: async (req, res) => {
        const id_user = req.userId

        try {
            const categories = await categoryModel.getAllCategory(id_user)
            console.log(categories)

            if(categories.error == false){
                res.status(201).json(categories)
            } else if (categories.error == true) {
                res.status(400).json(categories)
            } else {
                res.status(500).json({
                    error: true,
                    message: "Houve um erro no servidor."
                })
            }    

        } catch(error){
            throw error
        }
    }

}


module.exports = categoryController