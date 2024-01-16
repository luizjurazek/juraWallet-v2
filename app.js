const express = require('express')
const app = express()
const PORT = 3000

app.use(express.json())

const routerUsers = require('./routes/routesUser')

app.use('/users', routerUsers)

const verifyEmailInUse = require('./utils/emailInUseUtil')

app.get('/', async (req, res) => {
    const teste = await verifyEmailInUse('luizjurazek@gmail.com')

    console.log(teste)
})

app.listen(PORT, ()=>{
    console.log("Servidor rodando na porta: " + PORT)
})