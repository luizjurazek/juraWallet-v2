const express = require('express')
const router = express.Router()

const categoryController = require('../controllers/categoryController')

router.post('/createCategory', categoryController.createCategory)

router.get('/getAllCategories', categoryController.getAllCategory)
router.get('/getCategoryById/:id', categoryController.getCategoryById)

router.delete('/deleteCategoryById/:id', categoryController.deleteCategoryById)
router.delete('/deleteAllCategories')


module.exports = router