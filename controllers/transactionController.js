const transactionModel = require('../models/transactionModel')

const transactionController = {
    createTransaction: async (req, res) => {
        let transaction = {
            id_user,
            name_transaction,
            price_transaction,
            date_transaction,
            id_category,
            id_typeOftransaction
        } = req.body;
        transaction.id_user = req.userId

        try {
            const transactionInserted = await transactionModel.createTransaction(transaction)
            
            if (transactionInserted.error == false) {
                res.status(201).json(transactionInserted)
            } else if (transactionInserted.error == true) {
                res.status(400).json(transactionInserted)
            } else {
                res.status(500).json({
                    error: true,
                    message: "Houve um erro no servidor."
                })
            }
        } catch(error){
            throw error
        }
        
    }
}

module.exports = transactionController