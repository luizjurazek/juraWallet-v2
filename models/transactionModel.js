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

            if (insertTransactionResult.affectedRows === 0) {
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

            if (getTransactionByIdResult.length === 0) {
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
        } catch (error) {
            throw error
        }
    },
    getTransactionsByName: async (name_transaction, id_user) => {
        try {
            const getTransactionsByNameQuery = 'SELECT * FROM transaction WHERE name_transaction LIKE ? AND id_user = ?'
            const getTransactionsByNameResult = await connection.promise().query(getTransactionsByNameQuery, [`%${name_transaction}%`, id_user])
            let response;

            if (getTransactionsByNameResult[0].length === 0) {
                response = {
                    error: true,
                    message: `Não foram encontradas transação com o nome ${name_transaction}.`
                }
            } else {
                response = {
                    error: false,
                    message: `Foram encontradas ${getTransactionsByNameResult[0].length} transações correspondentes a busca ${name_transaction}`,
                    transactions: getTransactionsByNameResult[0]
                }
            }

            return response
        } catch (error) {
            throw error
        }
    },
    getTransactionsByCategoryName: async (name_category, id_user) => {
        try {
            const getTransactionsByCategoryNameQuery = 'SELECT * FROM transaction JOIN category ON transaction.id_category = category.id_category WHERE transaction.id_user = ? AND category.name_category LIKE ?'
            const getTransactionsByCategoryNameResult = await connection.promise().query(getTransactionsByCategoryNameQuery, [id_user, `%${name_category}%`])
            let response;

            if (getTransactionsByCategoryNameResult[0].length === 0) {
                response = {
                    error: true,
                    message: `Não foram encontradas transação com a categoria ${name_category}.`
                }
            } else {
                response = {
                    error: false,
                    message: `Foram encontradas ${getTransactionsByCategoryNameResult[0].length} transações correspondentes a busca ${name_category}`,
                    transactions: getTransactionsByCategoryNameResult[0]
                }
            }

            return response
        } catch (error) {
            throw error
        }

    }
}

module.exports = Transaction;