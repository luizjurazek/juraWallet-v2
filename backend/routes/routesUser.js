const express = require('express')
const router = express.Router()

const verifyJWT = require('../middlewares/auth')
const errorHandler = require('../middlewares/errorHandler')

const userController = require('../controllers/userController')

router.post('/create-new-user', userController.createNewUser)
router.post('/login', userController.loginUser)
router.delete('/delete-account', verifyJWT, userController.deleteAccount)

router.use(errorHandler)

module.exports = router
