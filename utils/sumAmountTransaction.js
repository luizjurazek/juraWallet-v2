
async function sumAmountTransaction(arrayTransactions){
  let amount = 0
  arrayTransactions.forEach(transaction => {
    let value = Number(transaction.price_transaction)
    amount += value
  })

  return amount
}

module.exports = {
  sumAmountTransaction
}