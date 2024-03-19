const {
  Op
} = require('sequelize');
const Transaction = require('../models/transactionModel')
const Category = require('../models/categoryModel')

const transactionController = {
  createTransaction: async (req, res) => {
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
    // #swagger.tags = ['Transaction']
    // #swagger.description = 'Endpoint para obter uma transação por id.'
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
    // #swagger.tags = ['Transaction']
    // #swagger.description = 'Endpoint para obter uma transação por nome.'
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
      if (transactions.length == 0) {
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
  getTransactionsByCategoryName: async (req, res) => {
    // #swagger.tags = ['Transaction']
    // #swagger.description = 'Endpoint para obter transações associadas a uma categoria.'
    let id_user = req.userId
    let name_category = req.params.name_category

    Transaction.findAll({
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
    }).then(transactions => {
      if (transactions.length == 0) {
        res.status(404).json({
          error: true,
          message: "Não foram encontradas transações relacionadas a categoria.",
          category_name: name_category
        })
      } else {
        res.status(200).json({
          error: false,
          message: "Transações encontradas com sucesso.",
          category_name: name_category,
          quantity_trasanctions: transactions.length,
          transactions: transactions
        })
      }
    }).catch(err => {
      console.error(err)
      res.status(500).json({
        error: true,
        message: "Houve um erro no servidor.",
        error: err
      })
    })

  },
  getTransactionByDate: async (req, res) => {
    // #swagger.tags = ['Transaction']
    // #swagger.description = 'Endpoint para obter transações associadas a uma data.'
    let dateToFind = req.params.date
    let id_user = req.userId

    const transactionByDate = Transaction.findAll({
      where: {
        id_user,
        date_transaction: {
          [Op.eq]: dateToFind
        }
      }
    }).then(data => {
      if(data.length === 0){
        res.status(404).json({
          error: true,
          message: `Não foram encontradas transações na data ${dateToFind}`,
          date: dateToFind
        })} else {
          res.status(200).json({
            error: false,
            message: `Foram encontradas ${data.length} transações associadas a data ${dateToFind}`,
            transaction: data
          })
        }
      }).catch(err => {
        // throw Error(err)
        res.status(500).json({
          error: true,
          message: "Houve um erro interno."
        })
      })

  },
  getTransactionsByDateRange: async (req, res) => {},
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
  
        res.status(200).json({
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