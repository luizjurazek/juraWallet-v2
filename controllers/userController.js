const UserModel = require('../models/userModel')
const verifyEmailInUse = require('../utils/emailInUseUtil')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const SECRET_JWT = process.env.SECRET_JWT

const userController = {
    createNewUser: async (req, res) => {
        const {
            name,
            lastname,
            phonenumber,
            email,
            birthday
        } = req.body

        const password = await bcrypt.hash(req.body.password, 8)

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

        // Consulta o banco para procurar as ocorrencias do email
        const row = await UserModel.loginUser(email)

        // Caso a query seja igual a 0 o usuário nao foi encontrado
        if (row.length === 0) {
            const response = {
                error: true,
                message: "Usuário não encontrado."
            }

            return res.status(400).json(response)
        }

        // guarda os dados do usuario na variavel user para facilitar a manipulacao
        const user = row[0]
        // compara a user.password que veio do banco com a password enviada na req de login
        // caso seja diferente retorno um status 400
        if (!(await bcrypt.compare(password, user.password_user))) {
            const response = {
                erro: true,
                message: "Email ou senha incorreto"
            }
            return res.status(400).json(response)
        }

        // Dias para expirar o token gerado abaixo
        const SEVEN_DAYS_MILISECONDS = 7 * 24 * 60 * 60 * 1000;
        // gera o token de autenticacao jwt
        const token = jwt.sign({
            user_id: user.id_user
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
    },
    deleteAccount: async (req, res) => {
        const user_id = req.userId
        const row = await UserModel.deleteAccount(user_id)
        
        if(row.affectedRows > 0){
            const response = {
                error: false, 
                message: "Conta deletada com sucesso."
            }

            return res.status(200).json(response)
        } else {
            const response = {
                error: true,
                message: "Houve um erro ao deletar a conta."
            }

            return res.status(400).json(response)
        }
    }
}

module.exports = userController