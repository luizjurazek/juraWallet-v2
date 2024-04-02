const express = require('express')
const router = express.Router()

const categoryController = require('../controllers/categoryController')

router.post('/create-category', categoryController.createCategory)

router.get('/get-all-categories', categoryController.getAllCategory)
router.get('/get-category-by-id/:id', categoryController.getCategoryById)
router.get('/getCategoryByName/:category_name')

router.put('/edit-category-by-id/:id_category/:new_name', categoryController.editCategory)

router.delete('/delete-category-by-id/:id', categoryController.deleteCategoryById)
router.delete('/delete-all-categories', categoryController.deleteAllCategories)


module.exports = router