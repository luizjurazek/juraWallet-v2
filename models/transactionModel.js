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
    }
}

module.exports = Transaction;