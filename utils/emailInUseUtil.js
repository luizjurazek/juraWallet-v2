const connection = require('../config/connection')

async function verifyEmailInUse(email){
    const query = 'SELECT email FROM users'
    const result = await connection.promise().query(query)
    let emailsInUse = result[0]

    emailsInUse = emailsInUse.map(obj => obj.email)

    for(let i = 0; i < emailsInUse.length; i++){
        if(emailsInUse[i] === email) return true
    }
    return false
}

module.exports = verifyEmailInUse