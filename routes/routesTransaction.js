const express = require('express')
const router = express.Router()

const transactionController = require('../controllers/transactionController')

router.post('/createTransaction', transactionController.createTransaction)

router.get('/getTransactionById/:id_transaction', transactionController.getTransactionById)
router.get('/getTransactionsByName/:name_transaction', transactionController.getTransactionsByName)
router.get('/getTransactionsByCategoryName/:name_category', transactionController.getTransactionsByCategoryName)
router.get('/getTransactionByDate')
router.get('/getTransactionsByDateRange')



module.exports = router