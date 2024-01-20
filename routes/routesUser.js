const express = require('express')
const router = express.Router()

const verifyJWT = require('../middlewares/auth')

const userController = require('../controllers/userController')

router.post('/createNewUser', userController.createNewUser)
router.post('/loginUser', userController.loginUser)
router.delete('/deleteAccount', verifyJWT, userController.deleteAccount)

module.exports = router
