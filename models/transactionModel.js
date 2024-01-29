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
            const transactionByIdQuery = 'SELECT name_transaction, price_transaction, date_transaction, id_category, id_typeOfTransaction FROM transaction WHERE id_transaction = ? AND id_user = ?'
            let transactionByIdResult = await connection.promise().query(transactionByIdQuery, [id_transaction, id_user])

            transactionByIdResult = transactionByIdResult[0]

            let response;

            if (transactionByIdResult.length === 0) {
                response = {
                    error: true,
                    message: "Transação não encontrada.",
                    id_transaction: id_transaction
                }
            } else {
                response = {
                    error: false,
                    message: "Transação encontrada com sucesso",
                    id_transaction: id_transaction,
                    transacao: {
                        name: transactionByIdResult[0].name_transaction,
                        price: transactionByIdResult[0].price_transaction,
                        date: transactionByIdResult[0].date_transaction,
                        category: transactionByIdResult[0].id_category,
                        type: transactionByIdResult[0].id_typeOfTransaction
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
            const transactionsByNameQuery = 'SELECT * FROM transaction WHERE name_transaction LIKE ? AND id_user = ?'
            const transactionsByNameResult = await connection.promise().query(transactionsByNameQuery, [`%${name_transaction}%`, id_user])
            let response;

            if (transactionsByNameResult[0].length === 0) {
                response = {
                    error: true,
                    message: `Não foram encontradas transação com o nome ${name_transaction}.`,
                    transaction_name: name_transaction
                }
            } else {
                response = {
                    error: false,
                    message: `Foram encontradas ${transactionsByNameResult[0].length} transações correspondentes a busca ${name_transaction}`,
                    transaction_name: name_transaction,
                    transactions: transactionsByNameResult[0]
                }
            }

            return response
        } catch (error) {
            throw error
        }
    },
    getTransactionsByCategoryName: async (name_category, id_user) => {
        try {
            const transactionsByCategoryNameQuery = 'SELECT * FROM transaction JOIN category ON transaction.id_category = category.id_category WHERE transaction.id_user = ? AND category.name_category LIKE ?'
            const transactionsByCategoryNameResult = await connection.promise().query(transactionsByCategoryNameQuery, [id_user, `%${name_category}%`])
            let response;

            if (transactionsByCategoryNameResult[0].length === 0) {
                response = {
                    error: true,
                    message: `Não foram encontradas transação com a categoria ${name_category}.`,
                    category: name_category
                }
            } else {
                response = {
                    error: false,
                    message: `Foram encontradas ${transactionsByCategoryNameResult[0].length} transações correspondentes a busca ${name_category}`,
                    category: name_category,
                    transactions: transactionsByCategoryNameResult[0]
                }
            }

            return response
        } catch (error) {
            throw error
        }
    },
    getTransactionByDate: async (date, id_user) => {
        try {
            const transactionsByDateQuery = 'SELECT * FROM transaction WHERE date_transaction = ? AND id_user = ?'
            const transactionByDateResult = await connection.promise().query(transactionsByDateQuery, [date, id_user])

            if (transactionByDateResult[0].length === 0) {
                response = {
                    error: true,
                    message: `Não foram encontradas transações com a data ${date}.`,
                    date: date
                }
            } else {
                response = {
                    error: false,
                    message: `Foram encontradas ${transactionByDateResult[0].length} transações correspondentes a data ${date}`,
                    date: date,
                    transactions: transactionByDateResult[0]
                }
            }

            return response
        } catch (error) {
            throw error
        }

    }
}

module.exports = Transaction;