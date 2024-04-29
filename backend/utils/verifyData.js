const {
    connection
} = require('../config/connection')


// Função para verificar se o email já está no banco de dados
async function verifyEmailInUse(email) {
    const query = 'SELECT email_user FROM users'
    const result = await connection.promise().query(query)

    let emailsInUse = result[0]

    // Transforma o array de objetos em um array 
    emailsInUse = emailsInUse.map(obj => obj.email_user)

    // Percorre o array de emails, caso encontre a correspondencia retornar true
    for (let i = 0; i < emailsInUse.length; i++) {
        if (emailsInUse[i] === email) return true
    }
    return false
}

async function verifyUserData(user) {
    const { name, lastname, phonenumber, email, birthday, password } = user

    // Padrão da expressão regular para validar o número de telefone
    const standardPhone = /^\(\d{2}\)\d{5}-\d{4}$/;
    const standardEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const standardbirthday = /^\d{4}-\d{2}-\d{2}$/;
    const standardPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    if(name === null || name === ""){
        const error = {
            error: true,
            statusCode: 400,
            message: "Preencha o nome"
        }
        return error
    }

    if(lastname === null || lastname === ""){
        const error = {
            error: true,
            statusCode: 400,
            message: "Preencha o sobrenome"
        }
        return error
    }

    if(phonenumber === null || phonenumber === ""){
        const error = {
            error: true,
            statusCode: 400,
            message: "O telefone não pode ser nulo ou estar em branco"
        }
        return error
    }

    if(!standardPhone.test(phonenumber)){
        const error = {
            error: true,
            statusCode: 400,
            message: "O telefone deve seguir o padrão (xx)xxx-xxxx"
        }
        return error
    }

    if(email === null || email === ''){
        const error = {
            error: true,
            statusCode: 400,
            message: "O email não pode ser nulo ou estar em branco"
        }
        return error
    }


    if(!standardEmail.test(email)){
        const error = {
            error: true,
            statusCode: 400,
            message: "O email deve seguir o padrão exemplo@mail.com"
        }
        return error
    }

    if(birthday === null || birthday === ''){
        const error = {
            error: true,
            statusCode: 400,
            message: "a data de nascimento não pode ser nulo ou estar em branco"
        }
        return error
    }


    if(!standardbirthday.test(birthday)){
        const error = {
            error: true,
            statusCode: 400,
            message: "a data de nascimento deve seguir o padrão y-m-d ou yyyy-mm-dd"
        }
        return error
    }

    if(!standardPassword.test(password)){
        const error = {
            error: true,
            statusCode: 400,
            message: "A senha precisa ter no mínimo um número, uma letra maiuscula e outra minuscula e ser maior que 8 caracteres"
        }
        return error
    }
}

async function verifyTransactionData(transaction){
    const standardDate = /^\d{4}-\d{2}-\d{2}$/;
    if(transaction.name_transaction === null || transaction.name === ""){
        const error = {
            error: true,
            statusCode: 400,
            message: "Preencha o nome"
        }
        return error
    }

    if(transaction.price_transaction === null || typeof transaction.price_transaction !== 'number'){
        const error = {
            error: true,
            statusCode: 400,
            message: "O campo price_transaction precisa ser diferente de null e ser um Number"
        }
        return error
    }

    if(!standardDate.test(transaction.date_transaction)){
        const error = {
            error: true,
            statusCode: 400,
            message: "a data de nascimento deve seguir o padrão y-m-d ou yyyy-mm-dd"
        }
        return error
    }


}


module.exports = {
    verifyEmailInUse,
    verifyUserData,
    verifyTransactionData
}