const express = require('express')
const router = express.Router()

const transactionController = require('../controllers/transactionController')
const errorHandler = require('../middlewares/errorHandler')

router.post('/create-transaction', transactionController.createTransaction)
router.get('/get-all-transaction', transactionController.getAllTransactions)
router.get('/get-transaction-by-id/:id_transaction', transactionController.getTransactionById)
router.get('/get-transactions-by-name/:name_transaction', transactionController.getTransactionsByName)
router.get('/get-transactions-by-category-name/:name_category', transactionController.getTransactionsByCategoryName)
router.get('/get-transaction-by-date/:date', transactionController.getTransactionByDate)
router.get('/get-transactions-by-date-range/:initial_date/:final_date', transactionController.getTransactionsByDateRange)

router.delete('/delete-transaction-by-id/:id_transaction', transactionController.deleteTransactionById)

// router.patch('edit-transaction')

router.use(errorHandler)

module.exports = router