const express = require('express')
const router = express.Router()

const categoryController = require('../controllers/categoryController')

router.post('/createCategory', categoryController.createCategory)

router.get('/getAllCategories', categoryController.getAllCategory)
router.get('/getCategoryById/:id', categoryController.getCategoryById)
router.get('/getCategoryByName/:category_name')

router.put('/editCategoryById/:id_category/:new_name', categoryController.editCategory)

router.delete('/deleteCategoryById/:id', categoryController.deleteCategoryById)
router.delete('/deleteAllCategories', categoryController.deleteAllCategories)


module.exports = router