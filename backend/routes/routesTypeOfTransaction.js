const express = require('express')
const router = express.Router() 

const typeOfTransactionController = require('../controllers/typeOfTransactionController')

router.post('/create-type-of-transaction/:name', typeOfTransactionController.createTypeOfTransaction)
router.get('/get-type-of-transaction', typeOfTransactionController.getTypeOfTransaction)
router.delete('/delete-type-of-transaction/:id_type_of_transaction', typeOfTransactionController.deleteTypeOfTransaction)

module.exports = router