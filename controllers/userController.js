const UserModel = require('../models/userModel')
const verifyEmailInUse = require('../utils/emailInUseUtil')
const jwt = require('jsonwebtoken')
const SECRET_JWT = process.env.SECRET_JWT

const userController = {
    createNewUser: async (req, res) => {
        const {
            name,
            lastname,
            phonenumber,
            email,
            password,
            birthday
        } = req.body

        if (await verifyEmailInUse(email)) {
            const response = {
                error: true,
                mensagem: "Email já utilizado!"
            }
            res.status(404).json(response)
        } else {
            try {
                const newUser = await UserModel.createNewUser(name, lastname, phonenumber, email, password, birthday)

                if (newUser.affectedRows > 0) {
                    const response = {
                        error: false,
                        mensagem: "Usuário cadastrado com sucesso!",
                        user: {
                            name: name,
                            lastname: lastname,
                            email: email
                        }
                    }

                    // Log de sucesso e envio da resposta
                    console.log(response)
                    res.status(201).json(response)
                } else {
                    const response = {
                        error: true,
                        mensagem: "Houve um erro ao cadastrar o usuário!",
                        user: {
                            name: name,
                            lastname: lastname,
                            email: email
                        }
                    }

                    // Log de sucesso e envio da resposta
                    console.log(response)
                    res.status(404).json(response)
                }

            } catch (error) {
                // Prepara a resposta de erro
                const response = {
                    error: true,
                    mensagem: "houve um erro no servidor!"
                }

                // Log de erro e envio da resposta
                console.log("Erro ao criar novo usuário: " + error)
                res.status(500).json(response)
            }
        }

    },
    loginUser: async (req, res) => {
        const {
            email,
            password
        } = req.body
        const row = await UserModel.loginUser(email)

        if (row.length === 0) {
            const response = {
                error: true,
                message: "Usuário não encontrado."
            }

            return res.status(400).json(response)
        }

        const user = row[0]
        if (user.password != password) {
            const response = {
                erro: true,
                message: "Email ou senha incorreto"
            }
            return res.status(400).json(response)
        }

        const SEVEN_DAYS_MILISECONDS = 7 * 24 * 60 * 60 * 1000;
        const token = jwt.sign({
            id: user.id_user
        }, SECRET_JWT, {
            expiresIn: SEVEN_DAYS_MILISECONDS // 7 dias
        })

        const response = {
            error: false,
            email: user.email,
            user_id: user.id_user,
            token: token
        }

        return res.status(200).json(response)
    }
}

module.exports = userController