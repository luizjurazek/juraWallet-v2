const express = require('express')
const app = express()
const PORT = 3000

app.use(express.json())

const routerUsers = require('./routes/routesUser')

app.use('/users', routerUsers)

app.listen(PORT, ()=>{
    console.log("Servidor rodando na porta: " + PORT)
})