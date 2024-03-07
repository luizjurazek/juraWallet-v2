const Transaction = require('../models/transactionModel')

const transactionController = {
  createTransaction: async (req, res) => {
    let data_transaction = {
      id_user,
      name_transaction,
      price_transaction,
      date_transaction,
      id_category,
      id_typeOftransaction
    } = req.body;
    data_transaction.id_user = req.userId

    const createdTransaction = await Transaction.create({
      name_transaction: data_transaction.name_transaction,
      price_transaction: data_transaction.price_transaction,
      date_transaction: data_transaction.date_transaction,
      id_user: data_transaction.id_user,
      id_category: data_transaction.id_category,
      id_typeOfTransaction: data_transaction.id_typeOftransaction
    }).then(transaction => {
      res.status(200).json(transaction)
    }).catch( err => {
      console.log("Erro: " + err.message)
      res.status(500).json({
        error: "Erro ao processar a transação."
      })
    })
  },
  getTransactionById: async (req, res) => {},
  getTransactionsByName: async(req, res) => {},
  getTransactionsByCategoryName: async(req, res) => {},
  getTransactionByDate: async(req, res) => {},
  getTransactionsByDateRange: async(req, res) => {},
  deleteTransactionById: async(req, res) => {},
}

module.exports = transactionController