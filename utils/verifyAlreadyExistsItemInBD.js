const connection = require('../config/connection')


async function verifyAlreadyExistsItemInBD(table, column, id_user, item){
    // Busca todos os itens no bd
    const query = 'SELECT ?? FROM ?? WHERE id_user = ?'
    const result = await connection.promise().query(query, [column, table, id_user])
    let itens = result[0]
    
    // Transforma o array de objetos em um array 
    itens = itens.map(obj => obj.name_category)

    // Percorre o array, caso encontre a correspondencia retorna true
    for(let i = 0; i < itens.length; i++){
        console.log(itens[i])
        if(itens[i] === item) return true
    }

    // Caso nao encontre correspondencia retorna false
    return false
}

module.exports = verifyAlreadyExistsItemInBD