const connection = require('../config/connection')

const Transaction = {
    createTransaction: async (transaction) => {
        const {
            name_transaction,
            price_transaction,
            date_transaction,
            id_category,
            id_typeOftransaction,
            id_user
        } = transaction

        try {
            const insertTransactionQuery =
                'INSERT INTO transaction (name_transaction, price_transaction, date_transaction, id_category, id_typeOftransaction, id_user) VALUES (?, ?, ?, ?, ?, ?)'
            const insertTransactionResult = connection.promise().query(insertTransactionQuery, 
                [name_transaction, price_transaction, date_transaction, id_category, id_typeOftransaction, id_user])
            let response; 

            if(insertTransactionResult.affectedRows === 0){
                response = {
                    error: true,
                    message: "Houve um erro ao cadastrar a transação."
                }
            } else {
                response = {
                    error: false,
                    message: "Transação cadastrada com sucesso.",
                    transaction: {
                        name: name_transaction,
                        price: price_transaction,
                        date: date_transaction, 
                        category: id_category, 
                        type: id_typeOftransaction
                    }
                }
            }

            return response
        } catch (error) {
            throw error
        }
    },
    getTransactionById: async (id_transaction, id_user) => {
        try {
            const getTransactionByIdQuery = 'SELECT name_transaction, price_transaction, date_transaction, id_category, id_typeOfTransaction FROM transaction WHERE id_transaction = ? AND id_user = ?'
            let getTransactionByIdResult = await connection.promise().query(getTransactionByIdQuery, [id_transaction, id_user])

            getTransactionByIdResult = getTransactionByIdResult[0]

            let response;

            if(getTransactionByIdResult.length === 0){
                response = {
                    error: true,
                    message: "Transação não encontrada.",
                    id_transacao: id_transaction
                }
            } else {
                response = {
                    error: false,
                    message: "Transação encontrada com sucesso",
                    transacao: {
                        name: getTransactionByIdResult[0].name_transaction,
                        price: getTransactionByIdResult[0].price_transaction,
                        date: getTransactionByIdResult[0].date_transaction,
                        category: getTransactionByIdResult[0].id_category,
                        type: getTransactionByIdResult[0].id_typeOfTransaction
                    }
                }
            }

            return response
        } catch(error){
            throw error
        }
        
    }
}

module.exports = Transaction;