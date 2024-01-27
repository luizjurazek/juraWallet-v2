const express = require('express')
const router = express.Router()

const transactionController = require('../controllers/transactionController')

router.post('/createTransaction', transactionController.createTransaction)

routet.get('/getTransactionById')
router.get('/getTransactionsByName')
router.get('/getTransactionsByCategory')
router.get('/getTransactionByDate')
router.get('/getTransactionsByDateRange')



module.exports = router