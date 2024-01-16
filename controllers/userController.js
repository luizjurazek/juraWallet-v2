const UserModel = require('../models/userModel')
const verifyEmailInUse = require('../utils/emailInUseUtil')


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

    }
}

module.exports = userController