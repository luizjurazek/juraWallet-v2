const express = require('express')
const router = express.Router() 

const typeOfTransactionController = require('../controllers/typeOfTransactionController')

router.post('/create-type-of-transaction/:name', typeOfTransactionController.createTypeOfTransaction)

module.exports = router