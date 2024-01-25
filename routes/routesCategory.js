const express = require('express')
const router = express.Router()

const verifyJWT = require('../middlewares/auth')
const categoryController = require('../controllers/categoryController')

router.get('/getAllCategories', categoryController.getAllCategory)
router.get('/getCategoryById/:id', categoryController.getCategoryById)
router.post('/createCategory', categoryController.createCategory)
router.delete('/deleteCategory')


module.exports = router