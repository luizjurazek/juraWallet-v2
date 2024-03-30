const TypeOfTransactionModel = require('../models/typeoftransactionsModel')

const typeOfTransactionController = {
  createTypeOfTransaction: async (req, res, next) => {
    // #swagger.tags = ['Type of transaction']
    // #swagger.description = 'Endpoint para criar um novo tipo de transação.'
    let name_of_type_of_transaction = req.params.name
    let id_user = req.userId

    try {

      const typeOfTransaction = await TypeOfTransactionModel.create({
        id_user,
        name_typeOfTransaction: name_of_type_of_transaction.trim()
      })

      if(!typeOfTransaction){
        const error = new Error("Houve um erro ao cadastrar o novo tipo de transação.")
        error.statusCode = 400
        throw error
      }

      return res.status(200).json({
        error: false,
        message: "Tipo de transação criada com sucesso.",
        type_of_transaction: name_of_type_of_transaction
      })
    } catch (error){
      next(error)
    }
  },
  deleteTypeOfTransaction: async (req, res, next) => {
    // #swagger.tags = ['Type of transaction']
    // #swagger.description = 'Endpoint para deletar um tipo de transação.'
    let id_type_of_transaction = req.params.id_type_of_transaction
    let id_user = req.userId

    try {
      const existItem = await TypeOfTransactionModel.findAll({
        where: {
          id_user,
          id_typeOfTransaction: id_type_of_transaction
        }
      })
      
      if(existItem.length === 0){
        const error = new Error('Tipo de transação não encontrada.')
        error.statusCode = 400
        throw error
      }

      return res.status(200).json({
        error: false,
        message: "Tipo de transação deletada com sucesso!",
        type_of_transaction: existItem
      })

    } catch (error){
      next(error)
    }
  }

}

module.exports = typeOfTransactionController