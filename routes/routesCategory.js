const express = require('express')
const router = express.Router()

const verifyJWT = require('../middlewares/auth')
const categoryController = require('../controllers/categoryController')

router.get('/getAllCategory')
router.get('/getCategory/:id')
router.post('/createCategory', categoryController.createCategory)
router.delete('/deleteCategory')


module.exports = router