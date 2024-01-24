const categoryModel = require('../models/categoryModel')

const categoryController = {
    createCategory: async (req, res) => {
        const category_name = req.body.category_name
        const id_user = req.userId

        const category = await categoryModel.createCategory(category_name, id_user)

        console.log(category)
    }
}


module.exports = categoryController