const User = require('../models/userModel')
const { verifyEmailInUse } = require('../utils/verifyData')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const SECRET_JWT = process.env.SECRET_JWT

const userController = {
  createNewUser: async (req, res) => {
    // #swagger.tags = ['User']
    // #swagger.description = 'Endpoint para criar um novo usuário.'
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

    // Criar verificacao dos dados do usuario 
    //  
    // 
    // 
    // 
    // 
    } else {
      try {
        const newUser = await User.create({
          name_user: name,
          lastname_user: lastname,
          phonenumber_user: phonenumber,
          email_user: email,
          password_user: password,
          birthday_user: birthday
        })

        if (newUser) {
          console.log(newUser)
          const response = {
            error: false,
            mensagem: "Usuário cadastrado com sucesso!",
            user: {
              id: newUser.dataValues.id_user,
              name: name,
              lastname: lastname,
              email: email,
              phonenumber: phonenumber,
              birthday: birthday
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
              email: email,
              phonenumber: phonenumber,
              birthday: birthday
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
    // #swagger.tags = ['Transaction']
    // #swagger.description = 'Endpoint para realizar login.'
    const {
      email,
      password
    } = req.body

    // Consulta o banco para procurar as ocorrencias do email
    const user = await User.findOne({
      where: { email_user: email }
    })

    // Caso a query seja igual a 0 o usuário nao foi encontrado
    if (!user) {
      const response = {
        error: true,
        message: "Usuário não encontrado."
      }

      return res.status(400).json(response)
    }

    // compara a user.password que veio do banco com a password enviada na req de login
    // caso seja diferente retorno um status 400
    if (!(await bcrypt.compare(password, user.dataValues.password_user))) {
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
    // #swagger.tags = ['Transaction']
    // #swagger.description = 'Endpoint para deletar um usuário.'
    const user_id = req.userId
    const user = await User.destroy({
      where: {
        id_user: user_id
      }
    })

    if (user == 1) {
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