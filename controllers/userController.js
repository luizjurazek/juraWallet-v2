const User = require('../models/userModel')
const {
  verifyEmailInUse,
  verifyUserData
} = require('../utils/verifyData')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const SECRET_JWT = process.env.SECRET_JWT

const userController = {
  createNewUser: async (req, res, next) => {
    const {
      name,
      lastname,
      phonenumber,
      email,
      birthday
    } = req.body
    // #swagger.tags =' ['User']
    // #swagger.description = 'Endpoint para criar um novo usuário.

    const password = await bcrypt.hash(req.body.password, 8)
    try {
      const verifyData = await verifyUserData(req.body)
      if(verifyData){
        const error = new Error(verifyData.message)
        error.statusCode = verifyData.statusCode

        throw error
      }

      if (await verifyEmailInUse(email)) {
        const error = new Error("Email já utilizado.")
        error.statusCode = 400
        
        throw error
      }

      const newUser = await User.create({
        name_user: name,
        lastname_user: lastname,
        phonenumber_user: phonenumber,
        email_user: email,
        password_user: password,
        birthday_user: birthday
      })

      if (newUser) {
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
        return res.status(201).json(response)
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
        return res.status(400).json(response)
      }
    } catch (error) {
      next(error)
    }
  },
  loginUser: async (req, res, next) => {
    // #swagger.tags = ['User']
    // #swagger.description = 'Endpoint para realizar login.'
    const {
      email,
      password
    } = req.body

    // Consulta o banco para procurar as ocorrencias do email
    try {
      const user = await User.findOne({
        where: {
          email_user: email
        }
      })


      if (!user) {
        const error = new Error("Usuário não encontrado.")
        error.statusCode = 404

        throw error
      }


      // compara a user.password que veio do banco com a password enviada na req de login
      // caso seja diferente retorno um status 400
      if (!(await bcrypt.compare(password, user.dataValues.password_user))) {
        const error = new Error("Email ou senha incorretos.")
        error.statusCode = 400

        throw error
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
    } catch (error) {
      next(error)
    }
  },
  deleteAccount: async (req, res, next) => {
    // #swagger.tags = ['User']
    // #swagger.description = 'Endpoint para deletar um usuário.'
    const user_id = req.userId

    try {
      const user = await User.destroy({
        where: {
          id_user: user_id
        }
      })

      if (user != 1) {
        const error = new Error("Houve um erro ao deletar o usuário.")
        error.statusCode = 404

        throw error
      }

      return res.status(200).json({
        error: false,
        message: "Conta deletada com sucesso."
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = userController