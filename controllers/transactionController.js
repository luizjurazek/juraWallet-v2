const { Op } = require('sequelize');
const Transaction = require('../models/transactionModel')
const Category = require('../models/categoryModel')

const { verifyTransactionData } = require('../utils/verifyData')
const { sumAmountTransaction } = require('../utils/sumAmountTransaction')

const transactionController = {
  createTransaction: async (req, res, next) => {
    // #swagger.tags = ['Transaction']
    // #swagger.description = 'Endpoint para criar uma transação.'
    let data_transaction = {
      id_user,
      name_transaction,
      price_transaction,
      date_transaction,
      id_category,
      id_typeOftransaction
    } = req.body;
    data_transaction.id_user = req.userId

    try {
      const checkData = await verifyTransactionData(data_transaction)
      if(checkData){
        const error = new Error(checkData.message)
        error.statusCode = checkData.statusCode
        throw error
      }

      const createdTransaction = await Transaction.create({
        name_transaction: data_transaction.name_transaction.trim(),
        price_transaction: data_transaction.price_transaction,
        date_transaction: data_transaction.date_transaction,
        id_user: data_transaction.id_user,
        id_category: data_transaction.id_category,
        id_typeOfTransaction: data_transaction.id_typeOftransaction
      })  

      if(createdTransaction.length === 0){
        const error = new Error("Houve um erro ao cadastrar a transação.")
        error.statusCode = 400
        throw error
      }
      
      return res.status(201).json({
        error: false,
        message: "Transação cadastrada com sucesso.",
        createdTransaction
      })

    } catch (error){
      console.log(error)
      if(error.name === 'SequelizeForeignKeyConstraintError'){
        return res.status(400).json({
          error: true,
          message: "Não foi possível adicionar a transação, uma foreign key falhou.",
          field: error.fields[0],
          index: error.index,
          value: error.value
        })
      } else {
        next(error)
      }
    }

  },
  getAllTransactions: async (req, res, next) => {
    // #swagger.tags = ['Transaction']
    // #swagger.description = 'Endpoint para buscar todas as transação.'
    let id_user = req.userId

    try {
      const transactions = await Transaction.findAll({
        where: {
          id_user
        }
      })

      if(transactions.length == 0){
        const error = new Error("Não foram encontradas transações")
        error.statusCode = 404

        throw error
      }

      let amount = await sumAmountTransaction(transactions)

      return res.status(200).json({
        error: false,
        message: `Foram encontradas ${transactions.length} transações.`,
        totalTransactions: transactions.length,
        amount,
        transactions
      })

    } catch (error){
      next(error)
    }


  },
  getTransactionById: async (req, res, next) => {
    // #swagger.tags = ['Transaction']
    // #swagger.description = 'Endpoint para obter uma transação por id.'
    let id_transaction = req.params.id_transaction
    let id_user = req.userId

    try {
      const transaction = await Transaction.findOne({
        where: {
          id_transaction: id_transaction,
          id_user: id_user
        }
      })

      if (transaction == null) {
        const error = new Error(`Não foram encontrada transações com o id ${id_transaction}`)
        error.statusCode = 404
        throw error
      }
      
      return res.status(200).json({
        error: false,
        message: "Transação localizada com sucesso.",
        transaction: transaction.dataValues
      })

    } catch (error){
      next(error)
    }
  },
  getTransactionsByName: async (req, res, next) => {
    // #swagger.tags = ['Transaction']
    // #swagger.description = 'Endpoint para obter uma transação por nome.'
    let id_user = req.userId
    let name_transaction = req.params.name_transaction

    try {
      const transactions = await Transaction.findAll({
        where: {
          id_user: id_user,
          name_transaction: {
            [Op.like]: `%${name_transaction}%`
          }
        }
      })

      if(transactions.length === 0){
        let error = new Error(`Não foram encontradas transações com o nome ${name_transaction}.`)
        error.statusCode = 404
        throw error
      }

      let amount = await sumAmountTransaction(transactions)
      return res.status(200).json({
        error: false,
        message: `Foram encontradas ${transactions.length} com o nome ${name_transaction}`,
        totalTransactions: transactions.length,
        amount,
        transactions
      })

    } catch (error){
      next(error)
    }
  },
  getTransactionsByCategoryName: async (req, res, next) => {
    // #swagger.tags = ['Transaction']
    // #swagger.description = 'Endpoint para obter transações associadas a uma categoria.'
    let id_user = req.userId
    let name_category = req.params.name_category

    try {
      let transactions = await Transaction.findAll({
        where: {
          id_user: id_user
        },
        include: [{
          model: Category,
          where: {
            name_category: {
              [Op.like]: `%${name_category}%`
            }
          }
        }]
      })

      if(transactions.length == 0){
        const error = new Error(`Não foram encontradas transações associadas a categoria ${name_category}.`)
        error.statusCode = 404
        throw error
      }

      let amount = await sumAmountTransaction(transactions)

      return res.status(200).json({
        error: false,
        message: `Foram encontradas ${transactions.length} transações associadas a categoria ${name_category}.`,
        category_name: name_category,
        quantity_trasanctions: transactions.length,
        amount,
        transactions
      })

    } catch (error){
      next(error)
    }
  },
  getTransactionByDate: async (req, res, next) => {
    // #swagger.tags = ['Transaction']
    // #swagger.description = 'Endpoint para obter transações associadas a uma data.'
    let dateToFind = req.params.date
    let id_user = req.userId

    try {
      const transactionByDate = await Transaction.findAll({
        where: {
          id_user,
          date_transaction: {
            [Op.eq]: dateToFind
          }
        }
      })

      if (transactionByDate.length == 0) {
        let error = new Error(`Não foram encontradas transações com a data ${dateToFind}.`)
        error.statusCode = 404
        throw error
      }

      let amount = await sumAmountTransaction(transactionByDate)

      return res.status(200).json({
        error: false,
        message: `Foram encontradas ${transactionByDate.length} transações associadas a data ${dateToFind}`,
        totalTransactions: transactionByDate.length,
        amount,
        transaction: transactionByDate
      })

    } catch (error) {
      next(error)
    }
  },
  getTransactionsByDateRange: async (req, res, next) => {
    // #swagger.tags = ['Transaction']
    // #swagger.description = 'Endpoint para selecionar todas as transações entre duas datas.'
    let id_user = req.userId
    let initial_date = req.params.initial_date
    let final_date = req.params.final_date

    try {
      const transactionInRangeDate = await Transaction.findAll({
        where: {
          id_user,
          date_transaction: {
            [Op.between]: [initial_date, final_date]
          }
        }
      })

      if(transactionInRangeDate.length === 0){
        const error = new Error(`Não foram encontradas transações entre as datas ${initial_date} e ${final_date}.`)
        error.statusCode = 404
        throw error
      }
      
      let amount = await sumAmountTransaction(transactionInRangeDate)

      return res.status(200).json({
        error: false,
        message: `Foram encontradas ${transactionInRangeDate.length} transações entre as datas ${initial_date} e ${final_date}.`,
        initial_date,
        final_date,
        totalTransactions: transactionInRangeDate.length,
        amount,
        transactionInRangeDate
      })

    } catch (error){
      next(error)
    }

  },
  deleteTransactionById: async (req, res) => {
    // #swagger.tags = ['Transaction']
    // #swagger.description = 'Endpoint para deletar uma transação.'
    let id_user = req.userId
    let id_transaction = req.params.id_transaction


    try {
      const transactionToDestroy = await Transaction.findOne({
        where: {
          id_user,
          id_transaction
        }
      })

      if (!transactionToDestroy) {
        console.error('Registro não encontrado')
        res.status(404).json({
          error: true,
          message: "Houve um erro ao deletar a transação.",
          id_transaction: id_transaction
        })
      } else {
        await Transaction.destroy({
          where: {
            id_user,
            id_transaction
          }
        })

        return res.status(200).json({
          error: false,
          message: "Transação deletada com sucesso.",
          id_transaction: id_transaction,
          transaction: transactionToDestroy.dataValues
        })
      }
    } catch (err) {
      res.status(500).json({
        error: true,
        message: "Houve um erro no servidor.",
        error: err
      })
    }
  }
}

module.exports = transactionController