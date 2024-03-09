const { Op } = require('sequelize');
const { sequelize } = require('../config/connection');
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
    }).catch(err => {
      console.log("Erro: " + err.message)
      res.status(500).json({
        error: "Erro ao processar a transação."
      })
    })
  },
  getTransactionById: async (req, res) => {
    let id_transaction = req.params.id_transaction
    let id_user = req.userId

    const selectedTransaction = await Transaction.findOne({
      where: {
        id_transaction: id_transaction,
        id_user: id_user
      }
    }).then((transaction => {
      if (transaction == null) {
        res.status(404).json({
          error: true,
          message: "Houve um erro ao buscar a transação.",
          id_transaction
        })
      } else {
        res.status(200).json({
          error: false,
          message: "Transação localizada com sucesso.",
          transaction: transaction.dataValues
        })
      }

    })).catch(err => {
      console.log("Erro: " + err)
      res.status(500).json({
        error: true,
        message: "Houve um erro interno."
      })
    })
  },
  getTransactionsByName: async (req, res) => {
    let id_user = req.userId
    let name_transaction = req.params.name_transaction
    console.log(id_user)
    console.log(name_transaction)
    Transaction.findAll({
      where: {
        id_user: id_user,
        name_transaction: {
          [Op.like]: `%${name_transaction}%`
        }
      }
    }).then(transactions => {
      console.log(transactions)
      if(transactions.length == 0){
        res.status(404).json({
          error: true,
          message: "Não foram encontradas transações.",
          transaction_name: name_transaction
        })
      } else {
        console.log(transactions)
        res.status(200).json({
          error: true,
          message: "Transacões encontradas com sucesso.",
          transactions: transactions
        })
      }
    }).catch(err => {
      console.log("Erro: " + err)
      res.status(500).json({
        error: true,
        message: "Houve um erro ao buscar as transações.",
        transaction_name: name_transaction
      })
    })
  },
  getTransactionsByCategoryName: async (req, res) => {},
  getTransactionByDate: async (req, res) => {},
  getTransactionsByDateRange: async (req, res) => {},
  deleteTransactionById: async (req, res) => {},
}

module.exports = transactionController