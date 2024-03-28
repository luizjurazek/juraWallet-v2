const typeOfTransactionModel = require('../models/typeoftransactionsModel')

const typeOfTransactionController = {
  createTypeOfTransaction: async (req, res, next) => {
    let nameOfTypeOfTransaction = req.params.name
    let id_user = req.userId

    try {

      const typeOfTransaction = await typeOfTransactionModel.create({
        id_user,
        name_typeOfTransaction: nameOfTypeOfTransaction
      })

      if(!typeOfTransaction){
        const error = new Error("Houve um erro ao cadastrar o novo tipo de transação.")
        error.statusCode = 400
        throw error
      }

      return res.status(200).json({
        error: false,
        message: "Tipo de transação criada com sucesso.",
        type_of_transaction: nameOfTypeOfTransaction
      })
    } catch (error){
      next(error)
    }
  }
}