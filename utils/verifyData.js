const { connection } = require('../config/connection')


// Função para verificar se o email já está no banco de dados
async function verifyEmailInUse(email){
    const query = 'SELECT email_user FROM users'
    const result = await connection.promise().query(query)
    
    let emailsInUse = result[0]

    // Transforma o array de objetos em um array 
    emailsInUse = emailsInUse.map(obj => obj.email_user)

    // Percorre o array de emails, caso encontre a correspondencia retornar true
    for(let i = 0; i < emailsInUse.length; i++){
        if(emailsInUse[i] === email) return true
    }
    return false
}


async function verifyUserData(email, password, birthday, phonenumber){
    
}


module.exports = { verifyEmailInUse }