const express = require('express')
const app = express()
const PORT = 3000

const verifyJWT = require('./middlewares/auth')

app.use(express.json())

const routerUsers = require('./routes/routesUser')
const routerCategory = require('./routes/routesCategory')
const routerTranction = require('./routes/routesTransaction')

app.use('/users', routerUsers)
app.use('/category', verifyJWT, routerCategory)
app.use('/transaction', verifyJWT, routerTranction)


app.listen(PORT, ()=>{
    console.log("Servidor rodando na porta: " + PORT)
})