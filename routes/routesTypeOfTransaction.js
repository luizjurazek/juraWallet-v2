const express = require('express')
const router = express.Router() 

const typeOfTransactionController = require('../controllers/typeOfTransactionController')

router.post('/createtypeoftransaction/:name', typeOfTransactionController.createTypeOfTransaction)

module.exports = router