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
        } catch (error) {
            throw error
        }
    },
    getTransactionById: async (req, res) => {
        const id_transaction = req.params.id_transaction
        const id_user = req.userId

        try {
            const transaction = await transactionModel.getTransactionById(id_transaction, id_user)

            if (transaction.error == false) {
                res.status(201).json(transaction)
            } else if (transaction.error == true) {
                res.status(400).json(transaction)
            } else {
                res.status(500).json({
                    error: true,
                    message: "Houve um erro no servidor."
                })
            }
        } catch (error) {
            throw error
        }
    },
    getTransactionsByName: async (req, res) => {
        const transaction_name = req.params.name_transaction
        const id_user = req.userId

        try {
            const transactions = await transactionModel.getTransactionsByName(transaction_name, id_user)

            if (transactions.error == false) {
                res.status(201).json(transactions)
            } else if (transactions.error == true) {
                res.status(400).json(transactions)
            } else {
                res.status(500).json({
                    error: true,
                    message: "Houve um erro no servidor."
                })
            }
        } catch (error) {
            throw error
        }
    },
    getTransactionsByCategoryName: async (req, res) => {
        const category_name = req.params.name_category
        const id_user = req.userId

        try {
            const transactions = await transactionModel.getTransactionsByCategoryName(category_name, id_user)
            if (transactions.error == false) {
                res.status(201).json(transactions)
            } else if (transactions.error == true) {
                res.status(400).json(transactions)
            } else {
                res.status(500).json({
                    error: true,
                    message: "Houve um erro no servidor."
                })
            }
        } catch (error) {
            throw error
        }
    }
}

module.exports = transactionController